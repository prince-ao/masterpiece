import express from "express";
import {
    userController,
    authenticationController,
    homepageController,
    paintingController,
    likeController,
    followController
} from "./controllers";

import cors from "cors";
import "dotenv/config";

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

app.use(express.json());

app.use("/api/user", userController);
app.use("/api/auth", authenticationController);
app.use("/api/like", likeController);
app.use("/api/follow", followController);
app.use("/api/homepage", homepageController);
app.use("/api/paintings", paintingController);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
