import mysql from "mysql2/promise"; // Pastikan pakai mysql2/promise biar support async/await
import dotenv from "dotenv";
dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 4000, // TiDB pakai port 4000
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // Cek .env kamu, pakai DB_PASS atau DB_PASSWORD?
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Biasanya ini yg diatur (bukan cuma queueLimit)
  queueLimit: 0,

  // WAJIB DITAMBAHKAN UNTUK TIDB CLOUD:
  ssl: {
    rejectUnauthorized: true,
    minVersion: "TLSv1.2",
  },
});

// Tes koneksi sekali saat server nyala (Opsional tapi sangat disarankan untuk debug)
pool
  .getConnection()
  .then((conn) => {
    console.log("✅ Database Connected Successfully to TiDB!");
    conn.release();
  })
  .catch((err) => {
    console.error("❌ Database Connection Failed:", err.message);
  });
