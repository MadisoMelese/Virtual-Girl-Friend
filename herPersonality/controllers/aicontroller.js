import Message from "../models/Message.js";
import {getOllamaResponse} from "../ollamaAi/ollama.js";

// Dummy AI Logic - responds with a flirty echo
export const respondToUser = async (req, res) => {
  try {
    const { content } = req.body;

    // Save user's message
    const userMessage = new Message({
      sender: req.user.id,
      content,
      type: "user",
    });
    await userMessage.save();

    // Generate and save Daname's reply
    const replyContent = getOllamaResponse(content);
    const danameReply = new Message({
      sender: req.user.id,
      content: replyContent,
      type: "daname",
    });
    await danameReply.save();

    res.status(200).json({ userMessage, danameReply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
