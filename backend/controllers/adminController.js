import * as adminModel from "../models/admin.js";

export async function getMentees(req, res) {
  try {
    const mentees = await adminModel.getMentees();
    res.json(mentees);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch mentees", error: err.message });
  }
}

export async function getMentors(req, res) {
  try {
    const mentors = await adminModel.getMentors();
    res.json(mentors);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch mentors", error: err.message });
  }
}

export async function getAdminReport(req, res) {
  try {
    const report = await adminModel.getAdminReport();
    res.json(report);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch report", error: err.message });
  }
}

export async function deleteUserByRole(req, res) {
  try {
    const { id, role } = req.params;
    await adminModel.deleteUserById(id, role);
    res.json({ message: "User deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete user", error: err.message });
  }
}
