import express from "express";
import {
  getStats,
  getAllUsers,
  getAllMessages,
  deleteUser,
  deleteMessage,
  adminLogin,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { protectAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/stats", getStats )
router.get("/users", protect, protectAdmin, getAllUsers);
router.get("/messages", protect, protectAdmin, getAllMessages);
router.delete("/user/:id", protect, protectAdmin, deleteUser);
router.delete("/message/:id", protect, protectAdmin, deleteMessage);

export default router;
