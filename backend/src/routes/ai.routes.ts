import express from "express";
import { generateQuestions } from "../controllers/ai.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

// Route for generating job-specific interview questions
// Protected by authentication middleware
router.post("/questions", authMiddleware, generateQuestions);

export default router;
