import { pool } from "../config/configDB.js";

async function getAllTags() {
    const conn = await pool.getConnection();

    const [tags] = await conn.query(
        'SELECT * FROM tags'
    );
    pool.releaseConnection(conn);
    return tags;
}

async function getTagById(id) {
    const conn = await pool.getConnection();
    const [tag] = await conn.query(
        'SELECT * FROM tags WHERE id = ?',
        [id]
    );
    pool.releaseConnection(conn);
    return tag[0];
}

export const tagServices = {
    getAllTags,
    getTagById
}