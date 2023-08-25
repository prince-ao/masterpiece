import express from "express";
import {
    userController,
    authenticationController,
    homepageController,
    paintingController,
    profileController,
    searchController,
    followController,
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
        limit: "10mb",
    })
);

app.use(express.json({ limit: "10mb" }));

app.use("/api/user", userController);
app.use("/api/auth", authenticationController);
app.use("/api/homepage", homepageController);
app.use("/api/paintings", paintingController);
app.use("/api/profile", profileController);
app.use("/api/search", searchController);
app.use("/api/follow", followController);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
