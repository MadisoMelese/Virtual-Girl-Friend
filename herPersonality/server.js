import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/ai", aiRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
