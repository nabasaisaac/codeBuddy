import { pool } from "../config/database.js";

export async function listMentors(req, res) {
  try {
    const { degree } = req.query;
    let query = `SELECT user_id, name, email, degree FROM users WHERE role = 'Mentor'`;
    let params = [];
    if (degree) {
      query += ` AND degree = ?`;
      params.push(degree);
    }
    const [mentors] = await pool.query(query, params);
    res.json(mentors);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch mentors", error: err.message });
  }
}

import { pool as db } from "../config/database.js";
export async function requestMentorship(req, res) {
  try {
    const { mentorId } = req.body;
    const menteeId = req.user.id;
    // Insert mentorship request using user IDs
    await db.query(
      `INSERT INTO mentorship_requests (mentee_id, mentor_id) VALUES (?, ?)`,
      [menteeId, mentorId]
    );
    res.json({ message: "Mentorship request sent", mentorId, menteeId });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to request mentorship", error: err.message });
  }
}
