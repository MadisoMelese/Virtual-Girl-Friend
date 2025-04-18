import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Signup";
import Chat from "./pages/Chat";

import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import Users from "./admin/Users";
import Chats from "./admin/Chats";

function App() {
  return (
    <Router>
      <Routes>
        {/* User Side */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/chat" element={<Chat />} />

        {/* Admin Side */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/chats" element={<Chats />} />
      </Routes>
    </Router>
  );
}

export default App;
