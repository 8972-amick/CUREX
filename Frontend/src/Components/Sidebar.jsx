import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import {
  CalendarPlus, CalendarDays, ClipboardList,
  Stethoscope, LogOut, MessageCircle, ShieldCheck, Microscope,
} from "lucide-react";

const ROLE_CONFIG = {
  DOCTOR: {
    label: "Doctor",
    color: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    menu: [
      { name: "Dashboard", path: "/doctor", icon: Stethoscope },
      { name: "Appointments", path: "/doctor/appointments", icon: ClipboardList },
      { name: "Chat", path: "/doctor/chat", icon: MessageCircle },
    ],
  },
  ADMIN: {
    label: "Admin",
    color: "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    menu: [
      { name: "Admin Console", path: "/admin", icon: ShieldCheck },
      { name: "Chat", path: "/admin/chat", icon: MessageCircle },
    ],
  },
  PATIENT: {
    label: "Patient",
    color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    menu: [
      { name: "Dashboard", path: "/patient", icon: CalendarDays },
      { name: "Book Appointment", path: "/patient/book", icon: CalendarPlus },
      { name: "My Appointments", path: "/patient/my-appointments", icon: ClipboardList },
      { name: "Symptom Analysis", path: "/patient/symptoms", icon: Microscope },
      { name: "Chat", path: "/patient/chat", icon: MessageCircle },
    ],
  },
};

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const role = localStorage.getItem("role")?.toUpperCase() || "PATIENT";
  const config = ROLE_CONFIG[role] || ROLE_CONFIG.PATIENT;

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="bg-white dark:bg-slate-900 w-64 min-h-screen shadow-sm border-r border-gray-100 dark:border-slate-800 p-5 flex flex-col justify-between">
      {/* Top */}
      <div>
        <div className="mb-8">
          <span className={`inline-block mt-2 text-xs font-semibold px-2.5 py-1 rounded-full ${config.color}`}>
            {config.label}
          </span>
        </div>

        <nav className="flex flex-col gap-1">
          {config.menu.map((item) => {
            const Icon = item.icon;
            const active =
              location.pathname === item.path ||
              (item.path !== "/doctor" &&
                item.path !== "/patient" &&
                item.path !== "/admin" &&
                location.pathname.startsWith(item.path + "/"));

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${active
                    ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white"
                  }`}
              >
                <span className={`w-1 h-4 rounded-full transition-all ${active ? "bg-emerald-500" : "bg-transparent"}`} />
                <Icon className="w-4 h-4 shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-100 dark:border-slate-800 pt-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 dark:hover:text-red-400 transition-all"
        >
          <span className="w-1 h-4 rounded-full bg-transparent" />
          <LogOut className="w-4 h-4 shrink-0" />
          Logout
        </button>
      </div>
    </div>
  );
}