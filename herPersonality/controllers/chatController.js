import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const message = new Message({
      sender: req.user.id,
      content,
      type: "user",
    });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ sender: req.user.id }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
