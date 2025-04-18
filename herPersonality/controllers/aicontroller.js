import Message from "../models/Message.js";

// Dummy AI Logic - responds with a flirty echo
const generateDanameReply = (userMessage) => {
  const lower = userMessage.toLowerCase();

  if (lower.includes("hello") || lower.includes("hi")) {
    return "Hey babe, I was just thinking about you.";
  } else if (lower.includes("how are you")) {
    return "I’m always better when I hear from you.";
  } else if (lower.includes("love")) {
    return "Aww, I love you more!";
  } else {
    return `Hmm… tell me more about that.`;
  }
};

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
    const replyContent = generateDanameReply(content);
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
