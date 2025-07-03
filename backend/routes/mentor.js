import express from "express";
import {
  listMentors,
  requestMentorship,
} from "../controllers/mentorController.js";
import { authenticateToken } from "../middleware/auth.js";
const router = express.Router();

router.get("/", listMentors);
router.post("/request", authenticateToken, requestMentorship);

export default router;
