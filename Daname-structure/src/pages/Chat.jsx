import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import  useAuth  from "../context/useAuth.js";


const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchMessages();
    }
  }, [user, navigate]);

  const fetchMessages = async () => {
    try {
      const res = await API.get("/chat/history");
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    try {
      const res = await API.post("/ai/chat", { content: message });
      setMessages([...messages, res.data.userMessage, res.data.danameReply]);
      setMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg._id} className={`max-w-xs ${msg.type === "daname" ? "ml-auto" : "mr-auto"} p-4 bg-blue-100 rounded-xl`}>
              <p className="font-bold">{msg.type === "daname" ? "Daname" : user.username}</p>
              <p>{msg.content}</p>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={sendMessage} className="p-4 bg-white flex items-center space-x-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Say something..."
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
