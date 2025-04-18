import { useEffect, useState } from "react";
import API from "../api/axios";

const Dashboard = () => {
  const [stats, setStats] = useState({ users: 0, messages: 0 });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    API.get("/admin/stats", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-3xl">{stats.users}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold">Total Messages</h2>
          <p className="text-3xl">{stats.messages}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
