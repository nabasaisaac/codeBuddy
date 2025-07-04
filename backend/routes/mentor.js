import express from "express";
import {
  listMentors,
  requestMentorship,
  getMentorshipRequests,
  updateMentorshipRequest,
  getMenteeRequests,
} from "../controllers/mentorController.js";
import { authenticateToken } from "../middleware/auth.js";
const router = express.Router();

router.get("/", listMentors);
router.post("/request", authenticateToken, requestMentorship);
router.get("/requests", authenticateToken, getMentorshipRequests);
router.patch(
  "/requests/:requestId",
  authenticateToken,
  updateMentorshipRequest
);
router.get("/mentee-requests", authenticateToken, getMenteeRequests);

export default router;
