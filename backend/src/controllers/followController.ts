import express from "express";
import pool from "../db";
import authenticateToken from "../middleware/authenticateToken";

const router = express.Router();

router.post("/:user_id", authenticateToken, async (req, res) => {
    try {
        const authenticatedUser = (req as any).user_id;

        const checkFollow = await pool.query(
            `SELECT EXISTS (
                SELECT 1
                FROM follow
                WHERE follower_id = $1 AND following_id = $2
            ) AS is_following;`,
            [authenticatedUser, req.params.user_id]
        );
        const isFollowing = checkFollow.rows[0].is_following;

        if (isFollowing == true) {
            return res.status(400).json({
                error_message: "You've already followed this user.",
            });
        }
        await pool.query(
            "INSERT INTO follow (follower_id, following_id, created_at) VALUES ($1, $2, $3);",
            [authenticatedUser, req.params.user_id, new Date()]
        );

        res.status(200).json({ message: "User followed Succesfully" });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: "An error occurred." });
    }
});

router.delete("/:user_id", authenticateToken, async (req, res) => {
    try {
        const authenticatedUser = (req as any).user_id;

        const checkFollow = await pool.query(
            `SELECT EXISTS (
                SELECT 1
                FROM follow
                WHERE follower_id = $1 AND following_id = $2
            ) AS is_following;`,
            [authenticatedUser, req.params.user_id]
        );

        const isFollowing = checkFollow.rows[0].is_following;

        if (isFollowing == false) {
            return res.status(400).json({
                error_message: "You are not following this user",
            });
        }

        await pool.query(
            "DELETE FROM follow WHERE follower_id = $1 AND following_id = $2;",
            [authenticatedUser, req.params.user_id]
        );

        res.status(200).json({ message: "User deleted Succesfully" });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: "An error occurred." });
    }
});

export default router;
