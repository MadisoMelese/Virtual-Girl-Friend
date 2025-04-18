import { useEffect, useState } from "react";
import API from "../api/axios";

const Chats = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    API.get("/admin/messages", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setChats(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Chat Logs</h2>
      <div className="space-y-3">
        {chats.map((c) => (
          <div key={c._id} className="bg-gray-100 p-4 rounded">
            <p><strong>{c.sender.username}</strong> ➡️ {c.type === "daname" ? "Daname" : "User"}</p>
            <p>{c.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chats;
