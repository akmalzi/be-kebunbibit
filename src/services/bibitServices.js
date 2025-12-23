import { pool } from "../config/configDB.js";

async function getAllBibit() {
    const conn = await pool.getConnection();

    const [bibits] = await conn.query(
        'SELECT * FROM bibits'
    );
    pool.releaseConnection(conn);
    return bibits;
}

async function getBibitById(id) {
    const conn = await pool.getConnection();
    const [bibit] = await conn.query(
        'SELECT * FROM bibits WHERE id = ?',
        [id]
    );

    pool.releaseConnection(conn);
    return bibit[0];
}

export const bibitServices = {
    getAllBibit,
    getBibitById
}