import { pool } from "../config/database.js";
import bcrypt from "bcrypt";

export async function getMentees() {
  const [rows] = await pool.query(
    `SELECT user_id as id, name, email, degree FROM users WHERE role = 'Mentee'`
  );
  return rows;
}

export async function getMentors() {
  const [rows] = await pool.query(
    `SELECT user_id as id, name, email, degree as specialty FROM users WHERE role = 'Mentor'`
  );
  return rows;
}

export async function getAdminReport() {
  const [[mentees]] = await pool.query(
    `SELECT COUNT(*) as totalMentees FROM users WHERE role = 'Mentee'`
  );
  const [[mentors]] = await pool.query(
    `SELECT COUNT(*) as totalMentors FROM users WHERE role = 'Mentor'`
  );
  const [[sessions]] = await pool.query(
    `SELECT COUNT(*) as activeSessions FROM mentorship_requests WHERE status = 'accepted'`
  );
  return {
    totalMentees: mentees.totalMentees,
    totalMentors: mentors.totalMentors,
    activeSessions: sessions.activeSessions,
  };
}

export async function deleteUserById(id, role) {
  await pool.query(`DELETE FROM users WHERE user_id = ? AND role = ?`, [
    id,
    role,
  ]);
}

export async function addMentee({ name, email, password, degree }) {
  const password_hash = await bcrypt.hash(password, 10);
  await pool.query(
    `INSERT INTO users (name, email, password_hash, degree, role) VALUES (?, ?, ?, ?, 'Mentee')`,
    [name, email, password_hash, degree]
  );
}

export async function addMentor({ name, email, password, specialty }) {
  const password_hash = await bcrypt.hash(password, 10);
  await pool.query(
    `INSERT INTO users (name, email, password_hash, degree, role) VALUES (?, ?, ?, ?, 'Mentor')`,
    [name, email, password_hash, specialty]
  );
}

export async function editMentee(id, { name, email, degree }) {
  await pool.query(
    `UPDATE users SET name = ?, email = ?, degree = ? WHERE user_id = ? AND role = 'Mentee'`,
    [name, email, degree, id]
  );
}

export async function editMentor(id, { name, email, specialty }) {
  await pool.query(
    `UPDATE users SET name = ?, email = ?, degree = ? WHERE user_id = ? AND role = 'Mentor'`,
    [name, email, specialty, id]
  );
}

export async function getMentorshipRequestsReport() {
  const [rows] = await pool.query(`SELECT * FROM mentorship_requests`);
  return rows;
}
