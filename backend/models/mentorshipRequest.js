import { pool } from "../config/database.js";

export async function createMentorshipRequest({ mentee_id, mentor_id }) {
  const [result] = await pool.query(
    `INSERT INTO mentorship_requests (mentee_id, mentor_id) VALUES (?, ?)`,
    [mentee_id, mentor_id]
  );
  return result.insertId;
}

export async function getRequestsByMentee(mentee_id) {
  const [rows] = await pool.query(
    `SELECT * FROM mentorship_requests WHERE mentee_id = ?`,
    [mentee_id]
  );
  return rows;
}

export async function getRequestsByMentor(mentor_id) {
  const [rows] = await pool.query(
    `SELECT * FROM mentorship_requests WHERE mentor_id = ?`,
    [mentor_id]
  );
  return rows;
}
