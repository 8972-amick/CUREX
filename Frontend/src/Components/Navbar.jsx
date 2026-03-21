import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BellDot, Settings } from "lucide-react";

export default function Navbar() {

  const [user, setUser] = useState({ name: "", email: "", role: "PATIENT" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) return;

    if (role) {
      setUser((prev) => ({ ...prev, role }));
    }

    fetch("http://localhost:3000/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
      })
      .then((data) => {
        setUser({ name: data.name, email: data.email, role: data.role || role || "PATIENT" });
        localStorage.setItem("role", data.role || role || "PATIENT");
      })
      .catch((err) => console.error("Error fetching user:", err));
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
          to="/my-appointments"
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

        <BellDot className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-emerald-500 cursor-pointer transition" />

        <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-emerald-500 cursor-pointer transition" />

        {/* USER INFO */}
        {user.name && (
          <div className="px-3 py-1 bg-gray-100 dark:bg-slate-700 rounded-md text-sm text-gray-700 dark:text-gray-200">
            <p className="font-semibold">{user.name}</p>
            <p className="text-xs">{user.email}</p>
            <p className="text-xs">Role: {user.role}</p>
          </div>
        )}

      </div>

    </div>
  );
}