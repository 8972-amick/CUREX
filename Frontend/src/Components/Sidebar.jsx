import { Link, useLocation, useNavigate } from "react-router-dom";
import { CalendarPlus, ClipboardList, Stethoscope, LogOut } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    {
      name: "Book Appointment",
      path: "/book",
      icon: CalendarPlus,
    },
    {
      name: "My Appointments",
      path: "/my-appointments",
      icon: ClipboardList,
    },
    {
      name: "Doctor Panel",
      path: "/doctor",
      icon: Stethoscope,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-white dark:bg-slate-900 w-64 min-h-screen shadow-lg p-6 border-r border-gray-200 dark:border-slate-700 flex flex-col justify-between">

      {/* Top Section */}
      <div>
        {/* Title */}
        <h2 className="text-xl font-bold text-emerald-500 mb-8">
          Dashboard
        </h2>

        {/* Menu */}
        <div className="flex flex-col gap-2">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
                ${
                  active
                    ? "bg-emerald-100 text-emerald-600 font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Logout Section */}
      <div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 mt-6 rounded-lg text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

    </div>
  );
}