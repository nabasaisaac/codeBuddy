import { pool } from "../config/database.js";

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
