import express from "express";
import { userController } from "./controllers";
import pool from "./db";
import cors from "cors";

const app = express();
const PORT = 3005;

const corsOptions = {
    origin: true,
    credentials: true,
};

app.use(cors(corsOptions));

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use("/api/user", userController);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
