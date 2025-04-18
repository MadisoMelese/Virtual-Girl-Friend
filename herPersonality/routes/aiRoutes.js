import express from "express";
import { respondToUser } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/chat", protect, respondToUser);

export default router;
