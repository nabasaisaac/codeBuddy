import { pool } from "../config/database.js";
import bcrypt from "bcrypt";

// Fetch Mentees
export async function getMentees() {
  const [rows] = await pool.query(
    `SELECT user_id as id, name, email, degree FROM users WHERE role = 'Mentee'`
  );
  return rows;
}

// Fetch Mentors
export async function getMentors() {
  const [rows] = await pool.query(
    `SELECT user_id as id, name, email, degree FROM users WHERE role = 'Mentor'`
  );
  return rows;
}

// Admin Dashboard Stats
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

// Delete user by ID + Role (safer)
export async function deleteUserById(id, role) {
  await pool.query(
    `DELETE FROM users WHERE user_id = ? AND role = ?`,
    [id, role]
  );
}

// Add Mentee
export async function addMentee({ name, email, password, degree }) {
  const password_hash = await bcrypt.hash(password, 10);
  await pool.query(
    `INSERT INTO users (name, email, password_hash, degree, role) VALUES (?, ?, ?, ?, 'Mentee')`,
    [name, email, password_hash, degree]
  );
}

// Add Mentor
export async function addMentor({ name, email, password, degree }) {
  const password_hash = await bcrypt.hash(password, 10);
  await pool.query(
    `INSERT INTO users (name, email, password_hash, degree, role) VALUES (?, ?, ?, ?, 'Mentor')`,
    [name, email, password_hash, degree]
  );
}

// Edit Mentee
export async function editMentee(id, { name, email, degree }) {
  await pool.query(
    `UPDATE users SET name = ?, email = ?, degree = ? WHERE user_id = ? AND role = 'Mentee'`,
    [name, email, degree, id]
  );
}

// Edit Mentor
export async function editMentor(id, { name, email, degree }) {
  await pool.query(
    `UPDATE users SET name = ?, email = ?, degree = ? WHERE user_id = ? AND role = 'Mentor'`,
    [name, email, degree, id]
  );
}

// Report on Mentorship Requests
export async function getMentorshipRequestsReport() {
  const [rows] = await pool.query(`SELECT * FROM mentorship_requests`);
  return rows;
}
