import express from "express";
import pool from "../db";
import authenticateToken from "../middleware/authenticateToken";

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
    try {
        const user_id = (req as any).user_id; //how to access the decoded info

        const result = await pool.query(
            `SELECT
    u.username,
    u.bio,
    (
        SELECT COUNT(*)
        FROM follow
        WHERE following_id = u.user_id
    ) AS followers_count,
    (
        SELECT COUNT(*)
        FROM follow
        WHERE follower_id = u.user_id
    ) AS following_count,
    (
        SELECT COUNT(*)
        FROM painting
        WHERE user_id = u.user_id
    ) AS paintings_count,
    u.profile_image_url
FROM
    m_user u
WHERE
    u.user_id = $1;`,
            [user_id]
        );

        const user = result.rows[0];
        return res.status(200).send({
            username: user.username,
            bio: user.bio,
            followers_count: user.followers_count,
            following_count: user.following_count,
            painting_count: user.paintings_count,
            profile_image: user.profile_image_url,
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error_message: "Unexpected error" });
    }
});

export default router;
