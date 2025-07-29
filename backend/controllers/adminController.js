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

export async function addMentee(req, res) {
  try {
    await adminModel.addMentee(req.body);
    res.json({ message: "Mentee added" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add mentee", error: err.message });
  }
}

export async function addMentor(req, res) {
  try {
    await adminModel.addMentor(req.body);
    res.json({ message: "Mentor added" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add mentor", error: err.message });
  }
}

export async function editMentee(req, res) {
  try {
    await adminModel.editMentee(req.params.id, req.body);
    res.json({ message: "Mentee updated" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update mentee", error: err.message });
  }
}

export async function editMentor(req, res) {
  try {
    await adminModel.editMentor(req.params.id, req.body);
    res.json({ message: "Mentor updated" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update mentor", error: err.message });
  }
}

export async function getMentorshipRequestsReport(req, res){
  try {
    const requests = await adminModel.getMentorshipRequestsReport();
    res.status(200).json(requests);
  } catch (error) {
    console.error("Controller error in getMentorshipRequestsReport:", error);
    res.status(500).json({ message: "Failed to fetch mentorship requests report" });
  }
}