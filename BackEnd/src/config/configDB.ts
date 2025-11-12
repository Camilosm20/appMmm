import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";


dotenv.config({ path: path.join(__dirname, "../env/.env") });

const {
  DB_HOST = "",
  DB_PORT = "",
  DB_USER = "",
  DB_PASSWORD = "",
  DB_DATABASE = "",
  DB_CONNECTION_LIMIT = "",
} = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  waitForConnections: true,
  connectionLimit: Number(DB_CONNECTION_LIMIT),
  queueLimit: 0,
});

export default pool;

export async function Connection() {
  const conn = await pool.getConnection();
  try {
  await conn.ping();
  console.log("Conexión a la base de datos exitosa");
  } finally {
    conn.release();
  }
}
