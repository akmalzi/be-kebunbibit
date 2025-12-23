import { pool } from "../config/configDB.js";
import crypto from "crypto";
import bcrypt from "bcrypt";

async function registerUser(fname, lname, email, username, password) {
    const conn = await pool.getConnection();
    const uuid = crypto.randomUUID();
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const [results] = await conn.query(
        'INSERT INTO Users (id, fname, lname, email, username, password) VALUES (?, ?, ?, ?, ?, ?)',
        [uuid, fname, lname, email, username, hashedPassword]
    );
    pool.releaseConnection(conn);
    return results;
}

async function loginUser(email, password) {
    const conn = await pool.getConnection();
    const [users] = await conn.query(
        'SELECT * FROM Users WHERE email = ?',
        [email]
    );

    if (users.length === 0) {
        throw new Error('Email atau Password salah');
    };

    const isValidPassword = await bcrypt.compare(password, users[0].password);
    if(!isValidPassword) {
        throw new Error('Email atau Password salah');
    };
    
    return users[0];
}

async function logoutUser(token) {
   const conn = await pool.getConnection();
   const [results] = await conn.query(
        `INSERT INTO Blacklist_Tokens (token) VALUES (?)`,
        [token]
    );
    pool.releaseConnection(conn);
    return results;
}


export const authServices = {
    registerUser,
    loginUser,
    logoutUser
};