import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import pool from "../db";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await pool.query("SELECT * FROM m_user");
        console.log(users.rows);
        res.json(users.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred." });
    }
});

export default router;
