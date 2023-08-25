import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import pool from "../db";
import multer from "multer";
import { PutObjectCommand, CreateBucketCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../s3";
import path from "path";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { authenticateToken } from "../middleware";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/:painting_id", async (req, res) => {
    try {
        const painting_id = req.params.painting_id;
        const result = await pool.query(
            "SELECT * FROM painting WHERE painting_id = $1",
            [painting_id]
        );

        return res.status(200).send({
            image_url: result.rows[0].image_url,
            name: result.rows[0].name,
            price: result.rows[0].price,
            ai_price: result.rows[0].ai_price,
            caption: result.rows[0].caption,
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error_message: "Unknown error" });
    }
});

router.get("/user/:user_id", async (req, res) => {
    const params = req.params;

    const result = await pool.query(
        "SELECT image_url FROM painting WHERE user_id = $1",
        [params.user_id]
    );

    return res.status(200).send(result.rows.map(({ image_url }) => image_url));
});

router.get("/", authenticateToken, async (req, res) => {
    const result = await pool.query(
        "SELECT image_url FROM painting WHERE user_id = $1",
        [(req as any).user_id]
    );

    return res.status(200).send(result.rows.map(({ image_url }) => image_url));
});

router.post(
    "/",
    (req, res, next) => {
        if (
            req.body.image === undefined ||
            req.body.image === "" ||
            req.body.caption === undefined ||
            req.body.name === undefined ||
            req.body.price === undefined
        ) {
            return res.status(400).send({ error_message: "Invalid body" });
        } else next();
    },
    authenticateToken,
    async (req, res) => {
        const uuid_ = uuid();
        const body = req.body;
        const decodedImageBuffer = Buffer.from(body.image, "base64");

        const uploadParams = {
            Bucket: "cpt-hackathon-2023",
            Key: `images/${uuid_}.jpg`,
            Body: decodedImageBuffer,
            ContentType: "image/jpeg",
        };

        try {
            const response = await axios.post(`http://localhost:3006/patina`, {
                image: body.image,
            });

            await s3Client.send(new PutObjectCommand(uploadParams));

            await pool.query(
                "INSERT INTO painting(user_id, name, caption, image_url, price, ai_price, sold, created_at) VALUES ($1, $2, $3, $4, $5, $6, FALSE, $7)",
                [
                    (req as any).user_id,
                    body.name,
                    body.caption,
                    `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`,
                    body.price,
                    response.data.price,
                    new Date(),
                ]
            );

            return res.status(200).send({
                image_url: `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`,
            });
        } catch (err) {
            console.log(err);
            return res.status(400).send({
                error_message: "Unknown error",
            });
        }
    }
);

router.patch(
    "/:painting_id",
    (req, res, next) => {
        if (req.body.caption === undefined && req.body.name === undefined)
            return res.send(400).send({
                error_message: "Invalid body",
            });
        next();
    },
    authenticateToken,
    async (req, res) => {
        try {
            const painting_id = req.params.painting_id;
            const body = req.body;
            const result = await pool.query(
                "SELECT user_id FROM painting WHERE painting_id = $1",
                [painting_id]
            );

            if (result.rows.length == 0)
                return res.send(400).send({
                    error_message: "Painting does not exist.",
                });

            if (result.rows[0].user_id != (req as any).user_id)
                return res.status(400).send({
                    error_message: "User does not have access",
                });

            await pool.query(
                `UPDATE painting FROM painting SET ${
                    body.caption ? `caption = ${body.caption}, ` : ""
                } ${
                    body.name ? `name = ${body.name}` : ""
                } WHERE painting_id = $1`,
                [painting_id]
            );

            return res.status(200);
        } catch (err) {
            console.log(err);
            res.status(400).json({ error_message: "Unknown error" });
        }
    }
);

router.delete("/:painting_id", authenticateToken, async (req, res) => {
    try {
        const painting_id = req.params.painting_id;
        const body = req.body;
        const result = await pool.query(
            "SELECT user_id FROM painting WHERE painting_id = $1",
            [painting_id]
        );

        if (result.rows.length == 0)
            return res.send(400).send({
                error_message: "Painting does not exist.",
            });

        if (result.rows[0].user_id != (req as any).user_id)
            return res.status(400).send({
                error_message: "User does not have access",
            });

        await pool.query("DELETE FROM painting WHERE painting_id = $1", [
            painting_id,
        ]);

        return res.status(200);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error_message: "Unknown error" });
    }
});

export default router;
