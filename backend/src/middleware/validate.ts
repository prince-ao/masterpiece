import * as t from "io-ts";
import { isLeft } from "fp-ts/Either";
import { Request, Response, NextFunction } from "express";

export default class Validate {
    static validateLogin(req: Request, res: Response, next: NextFunction) {
        const Login = t.type({
            username: t.union([t.string, t.undefined]),
            email: t.union([t.string, t.undefined]),
            password: t.string,
        });

        const decoded = Login.decode(req.body);

        if (isLeft(decoded)) {
            return res.status(400).send({
                error_message: "Invalid body",
            });
        }

        if (req.body.username === undefined && req.body.email == undefined) {
            return res.status(400).send({
                error_message: "Invalid body",
            });
        }

        next();
    }

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
