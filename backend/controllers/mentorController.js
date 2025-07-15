import { pool } from "../config/database.js";
import { pool as db } from "../config/database.js";

export async function listMentors(req, res) {
  try {
    const { degree } = req.query;
    let query = `SELECT user_id, name, email, degree FROM users WHERE role = 'Mentor'`;// users with role 'Mentor'
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

export async function getMentorshipRequests(req, res) {
  try {
    const mentorId = req.user.id;
    const [requests] = await pool.query(
      `SELECT mr.request_id, mr.status, mr.description, u.user_id, u.name, u.email, u.degree
       FROM mentorship_requests mr
       JOIN users u ON mr.mentee_id = u.user_id
       WHERE mr.mentor_id = ? ORDER BY mr.created_at DESC`,
      [mentorId]
    );
    res.json(requests);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch requests", error: err.message });
  }
}


export async function requestMentorship(req, res) {
  try {
    const { mentorId, description } = req.body;
    const menteeId = req.user.id;
    await pool.query(
      `INSERT INTO mentorship_requests (mentee_id, mentor_id, description) VALUES (?, ?, ?)`,
      [menteeId, mentorId, description]
    );
    res.json({ message: "Mentorship request sent", mentorId, menteeId });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to request mentorship", error: err.message });
  }
}

export async function updateMentorshipRequest(req, res) {
  try {
    const { requestId } = req.params;
    const { action } = req.body; // 'Accepted' or 'Rejected'
    if (!["accepted", "rejected"].includes(action)) {
      return res.status(400).json({ message: "Invalid action" });
    }
    await pool.query(
      `UPDATE mentorship_requests SET status = ? WHERE request_id = ?`,
      [action, requestId]
    );
    res.json({ message: `Request ${action}` });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update request", error: err.message });
  }
}

export async function getMenteeRequests(req, res) {
  try {
    const menteeId = req.user.id;
    const [requests] = await pool.query(
      `SELECT mr.request_id, mr.status, mr.description, u.user_id, u.name, u.email, u.degree
       FROM mentorship_requests mr
       JOIN users u ON mr.mentor_id = u.user_id
       WHERE mr.mentee_id = ? ORDER BY created_at DESC`,
      [menteeId]
    );
    res.json(requests);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch mentee requests", error: err.message });
  }
}
