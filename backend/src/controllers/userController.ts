import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import pool from "../db";
import authenticateToken from "../middleware/authenticateToken";


const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
    try {
        const authenticatedUser = (req as any).user_id;//how to access the decoded info
        //const users = await pool.query("SELECT * FROM m_user");
        //console.log(users.rows);
        res.json(authenticatedUser)
        //res.json(users.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred." });
    }
});

export default router;
