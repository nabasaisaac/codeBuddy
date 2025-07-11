import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  getMentees,
  getMentors,
  getAdminReport,
  deleteUserByRole,
} from "../controllers/adminController.js";
const router = express.Router();

router.get("/mentees", authenticateToken, getMentees);
router.get("/mentors", authenticateToken, getMentors);
router.get("/report", authenticateToken, getAdminReport);
router.delete("/:role/:id", authenticateToken, deleteUserByRole);

export default router;
