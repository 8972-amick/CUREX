import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Bell, ChevronDown, User, LogOut } from "lucide-react";

const ROLE_COLORS = {
  DOCTOR: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  ADMIN: "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  PATIENT: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
};

export default function Navbar() {
  const initialRole = localStorage.getItem("role")?.toUpperCase() || "PATIENT";
  const [user, setUser] = useState({ name: "", email: "", role: initialRole });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hasNotif, setHasNotif] = useState(true);
  const dropdownRef = useRef(null);

  // Fetch user
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:3000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then((data) => {
        const newRole = data.role?.toUpperCase() || initialRole;
        setUser({ name: data.name, email: data.email, role: newRole });
        localStorage.setItem("role", newRole);
      })
      .catch((err) => console.error(err));
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  const roleColor = ROLE_COLORS[user.role] || ROLE_COLORS.PATIENT;

  const role = user.role.toLowerCase();

  const NAV_LINKS = [
    { to: `/${role}`, label: "Dashboard" },
    ...(role === "patient"
      ? [{ to: "/patient/my-appointments", label: "Appointments" }]
      : []),
    ...(role === "doctor"
      ? [{ to: "/doctor/license-verification", label: "Verify License" }]
      : []),
    { to: "/contact", label: "Contact" },
    { to: "/about", label: "About" },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 shadow-sm">
      <div className="px-7 h-16 flex items-center justify-between gap-6">

        {/* LOGO */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xl font-bold tracking-widest text-gray-900 dark:text-white">
            CUR<span className="text-emerald-500">EX</span>
          </span>
        </div>

        {/* NAV */}
        <nav className="hidden md:flex items-center gap-2">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium rounded-xl transition-all
                ${
                  isActive
                    ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-semibold"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Bell */}
          <button
            onClick={() => setHasNotif(false)}
            className="relative w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-emerald-500 transition"
          >
            <Bell className="w-5 h-5" />
            {hasNotif && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

         

          {/* Divider */}
          <div className="w-px h-6 bg-gray-200 dark:bg-slate-700 mx-1" />

          {/* USER DROPDOWN */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition"
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                {initials}
              </div>

              {/* Name + Role */}
              <div className="hidden sm:block text-left leading-tight">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate max-w-[120px]">
                  {user.name || "User"}
                </p>
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${roleColor}`}>
                  {user.role}
                </span>
              </div>

              <ChevronDown className={`w-4 h-4 text-gray-400 transition ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* DROPDOWN */}
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-lg py-2 z-50">

                {/* Header */}
                <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {user.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user.email || "email@example.com"}
                  </p>
                </div>

                {/* Menu */}
                <div className="py-1.5 px-2">
                  <button className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-xl transition">
                    <User className="w-4 h-4" />
                    Profile
                  </button>

                  {/* <button className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-xl transition">
                    <Settings className="w-4 h-4" />
                    Settings
                  </button> */}
                </div>

                {/* Logout */}
                <div className="border-t border-gray-100 dark:border-slate-700 pt-1.5 pb-1 px-2">
                  <button
                    onClick={() => {
                      localStorage.clear();
                      window.location.href = "/login";
                    }}
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}