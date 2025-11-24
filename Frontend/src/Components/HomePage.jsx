import React from "react";
import { Link} from "react-router-dom";


export default function Bar() {
  return (
    <div className="w-full flex flex-row items-center justify-between px-10 py-4 border-b border-gray-300 bg-white shadow-sm">
      {/* Logo */}
      <h1 className="font-bold text-2xl text-green-800 tracking-wide">
        CUREX 
      </h1>

      {/* Navigation Links */}
      <div className="flex items-center gap-10">
        <Link
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "text-lg font-bold text-orange-400 border-b-2 border-orange-400"
              : "text-lg text-black font-semibold  transition hover:border-b-4 border-green-700"
          }
        >
          DASHBOARD
        </Link>

        <Link
          to="/history"
          className={({ isActive }) =>
            isActive
              ? "text-lg font-bold text-orange-400"
              : "text-lg text-black font-semibold hover:border-b-4 border-green-700 transition"
          }
        >
          HISTORY
        </Link>

        <Link
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-lg font-bold text-orange-400"
              : "text-lg text-black font-semibold hover:border-b-4 border-green-700 transition"
          }
        >
          CONTACT
        </Link>

        <Link
          to="/aboutus"
          className={({ isActive }) =>
            isActive
              ? "text-lg font-bold text-orange-400"
              : "text-lg text-black font-semibold hover:border-b-4 border-green-700 transition"
          }
        >
          ABOUT US
        </Link>

        <button className="text-lg text-black font-semibold hover:border-b-4 border-green-700 transition">
          LOGOUT
        </button>
      </div>

      {/* Icons Section */}
      <div className="flex items-center gap-6">
        <span className="text-3xl cursor-pointer text-green-600">🔔</span>
        <span className="text-3xl cursor-pointer">🌐</span>

        {/* Profile Circle */}
        <div className="h-12 w-12 rounded-full border border-gray-400 cursor-pointer">
          
        </div>
      </div>
      
    </div>
  );
}