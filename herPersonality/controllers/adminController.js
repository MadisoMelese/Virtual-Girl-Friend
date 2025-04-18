import Admin from "../models/adminModel.js";
import User from "../models/user.js";
import Message from "../models/Message.js";
import generateToken from "../utils/generateToken.js";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      name: admin.name,
      token: generateToken(admin._id, "admin"), // extra 'admin' type for clarity
    });
  } else {
    res.status(401).json({ error: "Invalid email or password" });
  }
};
// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all messages
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate("sender", "username email");
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getStats = async (req, res) => {
  const users = await User.countDocuments();
  const messages = await Message.countDocuments();
  res.json({ users, messages });
};

// Optional: Delete user
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Optional: Delete message
export const deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

