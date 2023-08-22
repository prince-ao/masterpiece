import express from "express";

const userController = require('./controllers/userControllers');

const app = express();
const pool = require('./db');
const router = express.Router();
// import { pool } from "./db";
const cors = require("cors");
const PORT = 3005;

const corsOptions = {
    origin: true,
    credentials: true
  };

app.use(cors(corsOptions));

app.use(express.urlencoded({
    extended: true
  }));


app.use("/user", userController);



app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});



