import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

export const createConnection = async () => {
    try {
      const connection = await pool.getConnection();
      console.log("Connected to the database");
      connection.release();
    } catch (error) {
        console.error("Error creating database:", error);
    }
}