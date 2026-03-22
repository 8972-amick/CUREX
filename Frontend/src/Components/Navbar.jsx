import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BellDot, Settings } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "" });
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:3000/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
      })
      .then((data) => setUser({ name: data.name, email: data.email }))
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    fetch(`http://localhost:3000/api/notifications/user/${userId}/unread-count`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUnreadCount(data.unreadCount);
        }
      })
      .catch((err) => console.error("Error fetching unread count:", err));
  }, []);

  return (
    <div className="w-full flex items-center justify-between px-7 py-3 bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-50">

      {/* LOGO */}
      <div className="flex items-center space-x-4">

        {/* Logo Icon */}
        <div className="relative w-14 h-14">
          <div className="absolute top-0 left-4 w-5 h-5 bg-emerald-500 rounded-xl"></div>
          <div className="absolute top-4 left-0 w-5 h-5 bg-emerald-500 rounded-xl"></div>
          <div className="absolute top-4 left-8 w-5 h-5 bg-emerald-500 rounded-xl"></div>
          <div className="absolute top-8 left-4 w-5 h-5 bg-emerald-500 rounded-xl"></div>
        </div>

        {/* Logo Text */}
        <h1 className="text-3xl font-bold text-emerald-500 tracking-wide">
          CUREX
        </h1>

      </div>

      {/* NAVIGATION */}
      <div className="flex items-center gap-8">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-emerald-500 border-b-2 border-emerald-500 pb-1"
              : "text-gray-700 dark:text-gray-200 hover:text-emerald-500 transition"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-emerald-500 border-b-2 border-emerald-500 pb-1"
              : "text-gray-700 dark:text-gray-200 hover:text-emerald-500 transition"
          }
        >
          History
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-emerald-500 border-b-2 border-emerald-500 pb-1"
              : "text-gray-700 dark:text-gray-200 hover:text-emerald-500 transition"
          }
        >
          Contact
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-emerald-500 border-b-2 border-emerald-500 pb-1"
              : "text-gray-700 dark:text-gray-200 hover:text-emerald-500 transition"
          }
        >
          About
        </NavLink>

      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-5">

        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/notification")}
          title="View Notifications"
        >
          <BellDot className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-emerald-500 transition" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </div>

        <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-emerald-500 cursor-pointer transition" />

        {/* USER INFO */}
        {user.name && (
          <div className="px-3 py-1 bg-gray-100 dark:bg-slate-700 rounded-md text-sm text-gray-700 dark:text-gray-200">
            <p className="font-semibold">{user.name}</p>
            <p className="text-xs">{user.email}</p>
          </div>
        )}

      </div>

    </div>
  );
}