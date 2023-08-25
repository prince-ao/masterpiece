import express from "express";
import pool from "../db";
import authenticateToken from "../middleware/authenticateToken";

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
    const search = req.query.s;

    if (!search) return res.status(200).send([]);

    try {
        const result = await pool.query(
            "SELECT username, user_id FROM m_user WHERE username ILIKE $1",
            [`%${search}%`]
        );

        return res.status(200).send(result.rows);
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error_message: "Unexpected error" });
    }
});

export default router;
