import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    type: { type: String, enum: ["user", "daname"], default: "user" },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
