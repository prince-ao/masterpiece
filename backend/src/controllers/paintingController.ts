import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import pool from "../db";

const router = express.Router();
const LIMIT = 10;
const hour = 3600;
const day = 24 * hour;

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

export default router;
