import { pool } from "../config/configDB.js";

async function getAllRatings() {
    const conn = await pool.getConnection();

    const [ratings] = await conn.query(
        'SELECT ratings.id, users.photo, CONCAT(users.fname, " ", users.lname) as fullname, ratings.score, ratings.content, ratings.created_at, ratings.updated_at FROM ratings INNER JOIN users WHERE ratings.user_id = users.id ORDER BY ratings.created_at DESC'
    );
    pool.releaseConnection(conn);
    return ratings;
}

async function createRating(user_id, score, content) {
    const conn = await pool.getConnection();
    const [result] = await conn.query(
        'INSERT INTO ratings (user_id, score, content) VALUES (?, ?, ?)',
        [user_id, score, content]
    );
    pool.releaseConnection(conn);
    return result;
}

async function deleteRating(id, user_id) {
    const conn = await pool.getConnection();

    const [rating] = await conn.query(
        'SELECT id, user_id FROM ratings WHERE id = ?',
        [id]
    )

    if (rating.length === 0) {
        throw new Error('Rating tidak ditemukan');
    }

    if (rating[0].user_id !== user_id) {
        throw new Error('Anda tidak memiliki akses untuk menghapus rating ini');
    }

    const [result] = await conn.query(
        'DELETE FROM ratings WHERE id = ? AND user_id = ?',
        [id, user_id]
    );
    pool.releaseConnection(conn);
    return result;
}

export const ratingServices = {
    getAllRatings,
    createRating,
    deleteRating
}