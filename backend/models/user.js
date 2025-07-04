import { pool } from "../config/database.js";
import bcrypt from "bcrypt";

export async function createUser({ name, email, password, degree, role }) {
  const password_hash = await bcrypt.hash(password, 10);
  const [result] = await pool.query(
    `INSERT INTO users (name, email, password_hash, degree, role) VALUES (?, ?, ?, ?, ?)`,
    [name, email, password_hash, degree, role]
  );
  return result.insertId;
}

export async function findUserByEmail(email) {
  const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
    email,
  ]);
  return rows[0];
}

export async function findUserById(user_id) {
  const [rows] = await pool.query(`SELECT * FROM users WHERE user_id = ?`, [
    user_id,
  ]);
  return rows[0];
}

export async function validateUser(email, password) {
  const user = await findUserByEmail(email);
  if (!user) return null;
  const match = await bcrypt.compare(password, user.password_hash);
  return match ? user : null;
}
