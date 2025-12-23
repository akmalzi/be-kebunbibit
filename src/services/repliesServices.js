import { pool } from "../config/configDB.js";

async function getRepliesByForumId(forum_id) {
    const conn = await pool.getConnection();
    const [replies] = await conn.query(
        'SELECT replies.id, users.photo, CONCAT(users.fname, " ", users.lname) as fullname, replies.content, replies.created_at, replies.updated_at FROM replies INNER JOIN users WHERE replies.user_id = users.id AND replies.forum_id = ? ORDER BY replies.created_at ASC',
        [forum_id]
    );
    pool.releaseConnection(conn);
    return replies;
}

async function createReply(user_id, forum_id, content) {
    const conn = await pool.getConnection();
    const [result] = await conn.query(
        'INSERT INTO replies (user_id, forum_id, content) VALUES (?, ?, ?)',
        [user_id, forum_id, content]
    );
    pool.releaseConnection(conn);
    return result;
}

async function deleteReply(id, user_id) {
    const conn = await pool.getConnection();
    const [reply] = await conn.query(
        'SELECT id, user_id FROM replies WHERE id = ?',
        [id]
    );

    if (reply.length === 0) {
        throw new Error('Reply tidak ditemukan');
    }

    if (reply[0].user_id !== user_id) {
        throw new Error('Anda tidak memiliki akses');
    }

    const [result] = await conn.query(
        'DELETE FROM replies WHERE id = ? AND user_id = ?',
        [id, user_id]
    );
    result.reply = reply[0];

    pool.releaseConnection(conn);
    return result;
}

export const repliesServices = {
    getRepliesByForumId,
    createReply,
    deleteReply
}