import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  getMentees,
  getMentors,
  getAdminReport,
  deleteUserByRole,
  addMentee,
  addMentor,
  editMentee,
  editMentor,
  getMentorshipRequestsReport,
} from "../controllers/adminController.js";
const router = express.Router();

//Routes
router.get("/mentees", authenticateToken, getMentees);
router.get("/mentors", authenticateToken, getMentors);
router.get("/report", authenticateToken, getAdminReport);
router.delete("/:role/:id", authenticateToken, deleteUserByRole);
router.post("/mentee", authenticateToken, addMentee);
router.post("/mentor", authenticateToken, addMentor);
router.put("/mentee/:id", authenticateToken, editMentee);
router.put("/mentor/:id", authenticateToken, editMentor);
router.get(
  "/mentorship-requests-report",
  authenticateToken,
  getMentorshipRequestsReport
);

export default router;
