import { Request, Response, NextFunction } from "express";
import { request } from "http";
import jwt from "jsonwebtoken";

async function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token: string | undefined = req.header("Authentication") as string;

    if (!token) {
        return res.status(400).json({ error: "No token provided" });
    }

    try {
        const decoded = jwt.verify(
            token.split(" ")[1],
            process.env.JWT_SECRET as string
        ) as { user_id: string };
        (req as any).user_id = decoded.user_id;
    } catch (e: any) {
        if (e.message === "jwt expired") return res.status(401);
        return res.status(400).send({
            error_message: "Unexpected error",
        });
    }
    next();
}

export default authenticateToken;
