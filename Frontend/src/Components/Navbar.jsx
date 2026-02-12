import React from "react";
import { NavLink } from "react-router-dom";
import { BellDot, Settings } from "lucide-react";

export default function Bar() {
  const userEmail = localStorage.getItem("email");
  return (
    <div className="w-full flex flex-row items-center justify-between px-7 py-3  bg-white shadow-sm  top-0 z-50 ">
     <div className="flex items-center space-x-4 px-8 py-6 w-fit">
      
      {/* Logo Icon */}
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-4 w-6 h-6 bg-rose-800 rounded-xl"></div>
        <div className="absolute top-5 left-0 w-6 h-6 bg-rose-800 rounded-xl"></div>
        <div className="absolute top-5 left-8 w-6 h-6 bg-rose-800 rounded-xl"></div>
        <div className="absolute top-10 left-4 w-6 h-6 bg-rose-800 rounded-xl"></div>
      </div>

      {/* Logo Text */}
      <h1 className="text-4xl font-bold text-rose-800 tracking-wide">
        CUREX
      </h1>

    </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-8 pl-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ?
              "font-bold text-gray-600 border-b-3 border-teal-700"
            : "text-gray-600 font-semibold transition hover:text-gray-800 border-teal-700"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive ?
              "font-bold text-gray-600 border-b-3 border-teal-700"
            : "text-gray-600 font-semibold transition hover:text-gray-800 border-teal-700"
          }
        >
          History
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ?
              "font-bold text-gray-600 border-b-3 border-teal-700"
            : "text-gray-600 font-semibold transition hover:text-gray-800 border-teal-700"
          }
        >
          Contact
        </NavLink>

        <NavLink
          to="/aboutus"
          className={({ isActive }) =>
            isActive ?
              "font-bold text-gray-600 border-b-3 border-teal-700"
            : "text-gray-600 font-semibold transition hover:text-gray-800 border-teal-700"
          }
        >
          About Us
        </NavLink>
      </div>

      {/* Icons Section */}
      <div className="flex items-center gap-4">
        <BellDot className="w-5 h-5 text-gray-600 hover:text-gray-800 cursor-pointer" />
        <Settings className="w-5 h-5 text-gray-600 hover:text-gray-800 cursor-pointer" />
      </div>

      {userEmail && (
        <span className="px-3 py-1 bg-gray-100 rounded-md text-sm font-medium text-gray-700">
          {userEmail}
        </span>
      )}
    </div>
  );
}