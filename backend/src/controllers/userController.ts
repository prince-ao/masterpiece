import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import pool from "../db";
import authenticateToken from "../middleware/authenticateToken";


const router = express.Router();


export default router;
