import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import pool from "../db";
import { Validate } from "../middleware";
import client from "../cache";
import "dotenv/config";

const router = express.Router();
const saltRounds = 10;
const hour = 3600;
const day = 24 * hour;

router.post("/signup", Validate.validateSignup, async (req, res) => {
    try {
        let users = await pool.query(
            "SELECT user_id FROM m_user WHERE username = $1 OR email = $2",
            [req.body.username, req.body.email]
        );

        if (users.rows.length > 0) {
            return res.status(400).send({
                error_message: "user already exists",
            });
        }

        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(req.body.password, salt);

        await pool.query(
            "INSERT INTO m_user(username, email, password, created_at) values ($1, $2, $3, $4)",
            [req.body.username, req.body.email, hash, new Date()]
        );
        users = await pool.query(
            "SELECT user_id FROM m_user WHERE username = $1",
            [req.body.username]
        );

        const token = jwt.sign(
            { user_id: users.rows[0].user_id },
            process.env.JWT_SECRET as string,
            { expiresIn: day }
        );

        await client.connect();

        await client.set(token, 1, { EXAT: day });

        await client.disconnect();

        return res.status(200).send({
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error_message: "Unknown error" });
    }
});

router.post("/login", Validate.validateLogin, async (req, res) => {
    let users = await pool.query(
        "SELECT user_id, password FROM m_user WHERE username = $1 OR email = $2",
        [req.body.username, req.body.email]
    );

    if (users.rows.length === 0)
        return res.status(400).send({ error_message: "User not found" });

    if (!(await bcrypt.compare(req.body.password, users.rows[0].password)))
        return res.status(400).send({ error_message: "Invalid password" });

    const token = jwt.sign(
        { user_id: users.rows[0].user_id },
        process.env.JWT_SECRET as string,
        { expiresIn: day }
    );

    await client.connect();

    await client.set(token, 1, { EXAT: day });

    await client.disconnect();

    return res.status(200).send({
        token,
    });
});

export default router;
