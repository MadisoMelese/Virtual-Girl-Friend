import { useEffect, useState } from "react";
import API from "../api/axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    API.get("/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Users</h2>
      <div className="space-y-2">
        {users.map((u) => (
          <div key={u._id} className="p-3 bg-white shadow rounded">
            <p><strong>{u.username}</strong> – {u.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
