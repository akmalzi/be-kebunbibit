import { pool } from "../config/configDB.js";
import bcrypt from "bcrypt";
import path from "path";
import fs from 'fs';
import multer from "multer";

async function getUserById(id) {
    const conn = await pool.getConnection();
    const [user] = await conn.query(
        'SELECT id, photo, fname, lname, username, email FROM Users WHERE id = ?',
        [id]
    )

    if (user.length === 0) {
        throw new Error('User tidak ditemukan');
    }

    pool.releaseConnection(conn);
    return user[0];
}

async function changePassword(id, oldPassword, newPassword) {
    const conn = await pool.getConnection();

    const [user] = await conn.query(
        'SELECT id, password FROM Users WHERE id = ?',
        [id]
    );

    if (user.length === 0) {
        throw new Error('User tidak ditemukan');
    }

    const comparePassword = await bcrypt.compare(oldPassword, user[0].password);

    if (!comparePassword) {
        throw new Error('Password invalid');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const [res] = await conn.query(
        'UPDATE Users SET password = ? WHERE id = ?',
        [hashedPassword, id]
    );

    pool.releaseConnection(conn);
    return res;
}

async function editProfiles(id, fname, lname, username, photo) {
    const conn = await pool.getConnection();

    const [user] = await conn.query(
        'SELECT id, fname, lname, username, photo FROM Users WHERE id = ?',
        [id]
    )

    if(user.length === 0) {
        throw new Error('User tidak ditemukan');
    }


    const [res] = await conn.query(
        'UPDATE Users SET fname = ?, lname = ?, username = ? WHERE id = ?',
        [fname, lname, username, id]
    );

    if(photo) {
        if(user[0].photo) {
           const oldPhotoPath = path.join(process.cwd(), 'public', 'images', 'user', user[0].photo);
           await fs.promises.unlink(oldPhotoPath);
        }

        const [photoRes] = await conn.query(
             'UPDATE Users SET photo = ? WHERE id = ?',
             [photo, id]
        )
    }

    pool.releaseConnection(conn);
    return res;
}

async function deleteProfilePhoto(id) {
    const conn = await pool.getConnection();

    const [user] = await conn.query(
        'SELECT id, photo FROM Users WHERE id = ?',
        [id]
    )

    if(user.length === 0) {
        throw new Error('User tidak ditemukan');
    }

    if(user[0].photo) {
        const oldPhotoPath = path.join(process.cwd(), 'public', 'images', 'user', user[0].photo);
        await fs.promises.unlink(oldPhotoPath);
        
        const [res] = await conn.query(
            'UPDATE Users SET photo = NULL WHERE id = ?',
            [id]
        )

        pool.releaseConnection(conn);
        return res;
    } else {
        throw new Error('Foto profil tidak ditemukan');
    }
}

export const userServices = {
    getUserById,
    changePassword,
    editProfiles,
    deleteProfilePhoto
}