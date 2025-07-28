import { pool } from "../config/database.js";

export async function getMentors() {
  const [rows] = await pool.query("SELECT * FROM users WHERE role = 'Mentor'");
  return rows;
}

export async function getMentees() {
  const [rows] = await pool.query("SELECT * FROM users WHERE role = 'Mentee'");
  return rows;
}

export async function getAdminReport() {
  const [rows] = await pool.query(`
    SELECT r.*, u1.name AS reported_by_name, u2.name AS reported_user_name
    FROM reports r
    LEFT JOIN users u1 ON r.reported_by = u1.user_id
    LEFT JOIN users u2 ON r.reported_user = u2.user_id
  `);
  return rows;
}

export async function getMentorshipRequestsReport() {
  const [rows] = await pool.query(`
    SELECT mr.*, u1.name AS mentee_name, u2.name AS mentor_name
    FROM mentorship_requests mr
    LEFT JOIN users u1 ON mr.mentee_id = u1.user_id
    LEFT JOIN users u2 ON mr.mentor_id = u2.user_id
  `);
  return rows;
}

export async function deleteUserById(id, role) {
  await pool.query('DELETE FROM users WHERE user_id = ? AND role = ?', [id, role]);
}

export async function addMentee(data) {
  const { name, email, password_hash, degree } = data;
  await pool.query(
    'INSERT INTO users (name, email, password_hash, degree, role) VALUES (?, ?, ?, ?, ?)',
    [name, email, password_hash, degree, 'Mentee']
  );
}

export async function addMentor(data) {
  const { name, email, password_hash, degree } = data;
  await pool.query(
    'INSERT INTO users (name, email, password_hash, degree, role) VALUES (?, ?, ?, ?, ?)',
    [name, email, password_hash, degree, 'Mentor']
  );
}

export async function editMentee(id, data) {
  const { name, email, degree } = data;
  await pool.query(
    'UPDATE users SET name = ?, email = ?, degree = ? WHERE user_id = ? AND role = ?',
    [name, email, degree, id, 'Mentee']
  );
}

export async function editMentor(id, data) {
  const { name, email, degree } = data;
  await pool.query(
    'UPDATE users SET name = ?, email = ?, degree = ? WHERE user_id = ? AND role = ?',
    [name, email, degree, id, 'Mentor']
  );
}

export async function getUserDetails(id) {
  const [rows] = await pool.query(`
    SELECT u.user_id, u.name, u.email, u.degree, u.account_status,
           p.phone, p.university, p.year_of_study, p.bio, p.github_url, p.linkedin_url
    FROM users u
    LEFT JOIN personal_info p ON u.user_id = p.user_id
    WHERE u.user_id = ?
  `, [id]);
  return rows[0];
}

export async function updateUserStatus(id, status) {
  await pool.query('UPDATE users SET account_status = ? WHERE user_id = ?', [status, id]);
}

export async function updateReportStatus(id, status) {
  await pool.query('UPDATE reports SET status = ? WHERE report_id = ?', [status, id]);
}

export async function getStats() {
  const [users] = await pool.query('SELECT COUNT(*) AS count FROM users');
  const [mentors] = await pool.query("SELECT COUNT(*) AS count FROM users WHERE role = 'Mentor'");
  const [mentees] = await pool.query("SELECT COUNT(*) AS count FROM users WHERE role = 'Mentee'");
  const [requests] = await pool.query("SELECT COUNT(*) AS count FROM mentorship_requests WHERE status = 'pending'");
  const [reports] = await pool.query("SELECT COUNT(*) AS count FROM reports WHERE status = 'open'");
  
  return {
    totalUsers: users[0].count,
    totalMentors: mentors[0].count,
    totalMentees: mentees[0].count,
    pendingRequests: requests[0].count,
    openReports: reports[0].count
  };
}