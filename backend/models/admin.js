import { pool } from "../config/database.js";
import bcrypt from "bcrypt";

// Fetch Mentees
export async function getMentees() {
  const [rows] = await pool.query(
    `SELECT user_id as id, name, email, degree FROM users WHERE role = 'Mentee'`
  );
  return rows;
}

// fetch mentors
export async function getMentors() {
  const [rows] = await pool.query(

    `SELECT user_id, name, email, degree FROM users WHERE role = 'Mentor'`
  );
  return rows;
}

//
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

export async function editMentor(id, { name, email, degree }) {
  await pool.query(
    `UPDATE users SET name = ?, email = ?, degree = ? WHERE user_id = ? AND role = 'Mentor'`,
    [name, email, degree, id]
  );
}

export async function getMentorshipRequestsReport(){
  try {
    const [rows] = await pool.query(
      `SELECT 
        mr.request_id AS id,
        mentee.name AS mentee_name,
        mentor.name AS mentor_name,
        mr.status,
        mr.created_at
      FROM mentorship_requests mr
      LEFT JOIN users mentee ON mr.mentee_id = mentee.user_id
      LEFT JOIN users mentor ON mr.mentor_id = mentor.user_id
      ORDER BY mr.created_at DESC`
    );
    return rows;
  } catch (error) {
    console.error("Error fetching mentorship requests report:", error);
    throw new Error("Database query failed");
  }
}

///
export async function getAdminById(id) {
  const [[user]] = await pool.query(
    `SELECT user_id as id, name, email, password_hash FROM users WHERE user_id = ? AND role = 'Admin'`,
    [id]
  );
  return user;
}

export async function updateAdminProfile(id, { name, email }) {
  await pool.query(
    `UPDATE users SET name = ?, email = ? WHERE user_id = ? AND role = 'Admin'`,
    [name, email, id]
  );
}

export async function updateAdminPassword(id, newPasswordHash) {
  await pool.query(
    `UPDATE users SET password_hash = ? WHERE user_id = ? AND role = 'Admin'`,
    [newPasswordHash, id]
  );
}

