import express from "express";
import { sendMessage, getMessages } from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/send", protect, sendMessage);
router.get("/history", protect, getMessages);

export default router;
