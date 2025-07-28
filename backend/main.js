import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { PORT } from "./config/index.js";
import authRoutes from "./routes/auth.js";
import mentorRoutes from "./routes/mentor.js";
import userRoutes from "./routes/user.js";
import adminRoutes from "./routes/admin.js";
import mysql from "mysql2/promise";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Database initialization
async function initializeDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        multipleStatements: true
    });

    try {
        // Create database and tables
        await connection.query(`
            CREATE DATABASE IF NOT EXISTS codeBuddy;
            USE codeBuddy;

            CREATE TABLE IF NOT EXISTS users (
                user_id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL,
                email VARCHAR(50) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                degree VARCHAR(50),
                role ENUM('Mentee', 'Mentor', 'Admin') NOT NULL,
                account_status ENUM('active', 'inactive', 'suspended', 'pending', 'banned', 'locked') DEFAULT 'active',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS personal_info (
                info_id INT PRIMARY KEY AUTO_INCREMENT,
                user_id INT UNIQUE,
                phone VARCHAR(20),
                university VARCHAR(100),
                year_of_study INT,
                bio TEXT,
                profile_picture VARCHAR(255),
                github_url VARCHAR(255),
                linkedin_url VARCHAR(255),
                FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS mentorship_requests (
                request_id INT PRIMARY KEY AUTO_INCREMENT,
                mentee_id INT,
                mentor_id INT,
                description TEXT,
                status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (mentee_id) REFERENCES users(user_id) ON DELETE CASCADE,
                FOREIGN KEY (mentor_id) REFERENCES users(user_id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS reports (
                report_id INT PRIMARY KEY AUTO_INCREMENT,
                reported_by INT,
                reported_user INT,
                reason TEXT,
                status ENUM('open', 'resolved', 'dismissed') DEFAULT 'open',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (reported_by) REFERENCES users(user_id) ON DELETE SET NULL,
                FOREIGN KEY (reported_user) REFERENCES users(user_id) ON DELETE SET NULL
            );
        `);

        console.log('Database and tables initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        await connection.end();
    }
}

// Initialize database when server starts
initializeDatabase();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/mentors", mentorRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});