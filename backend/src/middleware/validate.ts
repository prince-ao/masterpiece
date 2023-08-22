import * as t from "io-ts";
import { isLeft } from "fp-ts/Either";
import { Request, Response, NextFunction } from "express";

export default class Validate {
    static validateSignup(req: Request, res: Response, next: NextFunction) {
        const Signup = t.type({
            username: t.string,
            email: t.string,
            password: t.string,
        });

        const decoded = Signup.decode(req.body);

        if (isLeft(decoded)) {
            return res.status(400).send({
                error_message: "Invalid body",
            });
        }

        next();
    }
}
