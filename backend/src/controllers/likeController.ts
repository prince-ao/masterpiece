import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import pool from "../db";
import authenticateToken from "../middleware/authenticateToken";


const router = express.Router();

router.post("/:painting_id", authenticateToken, async (req, res) => {
    try {
        const authenticatedUser = (req as any).user_id;
        
        const existingLike = await pool.query(
            "SELECT * FROM m_like WHERE user_id = $1 AND painting_id = $2",
            [authenticatedUser, req.params.painting_id]
        );

        if (existingLike.rows.length > 0) {
            return res.status(400).json({
                error_message: "You've already liked this painting.",
            });
        }

        await pool.query(
            "INSERT INTO m_like(user_id, painting_id, created_at) VALUES ($1, $2, $3)",
            [authenticatedUser, req.params.painting_id, new Date()]
        );

        res.status(200).json({ message: "Painting liked successfully." });
        
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: "An error occurred." });
    }
});

router.delete("/:painting_id/:m_like_id", authenticateToken, async (req, res) => {

    try {
        const authenticatedUser = (req as any).user_id;
        
        const existingLike = await pool.query(
            "SELECT * FROM m_like WHERE user_id = $1 AND painting_id = $2",
            [authenticatedUser, req.params.painting_id]
        );

        if (existingLike.rows.length == 0) {
            return res.status(400).json({
                error_message: "You have not liked this painting",
            });
        }

        await pool.query(
            "DELETE FROM m_like WHERE user_id = $1 AND painting_id = $2 AND m_like_id = $3",
            [authenticatedUser, req.params.painting_id, req.params.m_like_id]
        );
        
        res.status(200).json({ message: "Painting unliked successfully." });
        
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: "An error occurred." });
    }

});

export default router;