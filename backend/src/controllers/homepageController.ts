import jwt from "jsonwebtoken";
import express from "express";
import pool from "../db";

const router = express.Router();
const LIMIT = 10;

router.post("/", async (req, res) => {
    const offset =
        req.query.page === undefined ? 0 : (Number(req.query.page) - 1) * LIMIT;
    try {
        if (!req.header("Authorization")) {
            const result = await pool.query(
                `SELECT  p.*, u.*, COUNT(l.painting_id) AS num_likes 
                FROM painting p 
                INNER JOIN m_user u ON p.user_id = u.user_id
                LEFT JOIN m_like l ON p.painting_id = l.painting_id 
                GROUP BY p.painting_id, u.user_id
                ORDER BY num_likes DESC
                LIMIT ${LIMIT}
                OFFSET ${offset}
                `
            );

            return res.status(200).send(
                result.rows.map(
                    ({
                        painting_id,
                        user_id,
                        name,
                        caption,
                        image_url,
                        price,
                        ai_price,
                        num_likes,
                        username,
                        profile_image_url,
                    }) => ({
                        image_url,
                        name,
                        user_id,
                        username,
                        profile_image_url,
                        caption,
                        price,
                        ai_price,
                        likes: num_likes,
                        painting_id,
                    })
                )
            );
        } else {
            const token = req.header("Authorization")!.split(" ")[1];
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET as string
            ) as { user_id: string };

            const result = await pool.query(
                `SELECT p.*, u.*,
                            COUNT(l.painting_id) AS num_likes
                            FROM painting p
                            INNER JOIN m_user u ON p.user_id = u.user_id
                            INNER JOIN follow f ON u.user_id = f.following_id
                            LEFT JOIN m_like l ON p.painting_id = l.painting_id
                            WHERE f.follower_id = $1
                            GROUP BY p.painting_id, u.user_id
                            ORDER BY p.created_at DESC
                            LIMIT ${LIMIT}
                            OFFSET ${offset}`,
                [decoded.user_id]
            );

            return res.status(200).send(
                result.rows.map(
                    ({
                        painting_id,
                        user_id,
                        name,
                        caption,
                        image_url,
                        price,
                        ai_price,
                        num_likes,
                        username,
                        profile_image_url,
                    }) => ({
                        image_url,
                        name,
                        user_id,
                        username,
                        profile_image_url,
                        caption,
                        price,
                        ai_price,
                        likes: num_likes,
                        painting_id,
                    })
                )
            );
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ error_message: "Unknown error" });
    }
});

export default router;
