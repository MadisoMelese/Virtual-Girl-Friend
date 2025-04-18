import express from "express";
import {
  getAllUsers,
  getAllMessages,
  deleteUser,
  deleteMessage,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/users", protect, adminOnly, getAllUsers);
router.get("/messages", protect, adminOnly, getAllMessages);
router.delete("/user/:id", protect, adminOnly, deleteUser);
router.delete("/message/:id", protect, adminOnly, deleteMessage);

export default router;
