const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import express from "express";
const app = express();
import { Request, Response, Router } from 'express';
const router = express.Router();
import pool from '../db';

router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await pool.query('SELECT * FROM m_user');
        console.log(users.rows)
        res.json(users.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred.' }); 
    }
});


module.exports = router;

