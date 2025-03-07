import React from "react";
import { useUser } from "../../Authentication/Context_auth/UserContext";
import {
  FaBus,
  FaUtensils,
  FaCalendarAlt,
  FaClipboardList,
  FaUserShield,
  FaSync,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const { user, fetchUserDetails } = useUser();
  const navigate = useNavigate();

  // Check if user has an admin role
  const isAdmin = user?.roles?.some((role: any) => role.roleType === "ADMIN");

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-red-500">
        ❌ Access Denied! You are not an Admin.
      </div>
    );
  }

  // Refresh Admin Info
  const handleRefresh = () => {
    const storedUsername = localStorage.getItem("username");
    const storedToken = localStorage.getItem("token");
    if (storedUsername && storedToken) {
      fetchUserDetails(storedUsername, storedToken);
    }
  };

  // Feature Cards Data
  const features = [
    { title: "Bus Route Management", icon: <FaBus />, path: "/bus" },
    { title: "Canteen Management", icon: <FaUtensils />, path: "/canteen" },
    {
      title: "Exam Schedule Management",
      icon: <FaClipboardList />,
      path: "/class",
    },
    { title: "Event Management", icon: <FaCalendarAlt />, path: "/event" },
  ];

  return (
    <div className="min-h-screen container mx-auto bgland p-6 text-white">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-6">Admin Dashboard</h1>

      {/* Admin Info Card */}
      <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg text-center mb-8 relative">
        <FaUserShield className="text-6xl mx-auto text-blue-400 mb-3" />
        <h2 className="text-2xl font-semibold">{user?.username || "Admin"}</h2>
        <p className="text-gray-300">{user?.email || "admin@example.com"}</p>
        <span className="bg-blue-600 px-3 py-1 rounded-full text-sm mt-2 inline-block">
          {user?.roles?.[0]?.roleType || "Admin"}
        </span>
        <button
          onClick={handleRefresh}
          className="absolute top-4 right-4 text-gray-300 hover:text-white transition"
        >
          <FaSync className="text-xl" />
        </button>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            onClick={() => navigate(feature.path)}
            className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg shadow-lg flex flex-col items-center cursor-pointer transition transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="text-5xl text-blue-400 mb-4">{feature.icon}</div>
            <h2 className="text-lg text-black font-semibold">
              {feature.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
