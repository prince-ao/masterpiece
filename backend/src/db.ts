import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
    user: "postgres",
    password: process.env.PASS,
    host: "localhost",
    port: 5432,
    database: "masterpiece",
});

export default pool;
