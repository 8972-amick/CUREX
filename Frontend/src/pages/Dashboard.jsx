import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { CalendarDays, UserCheck, Users, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "DOCTOR") {
      navigate("/");
    }
  }, [navigate]);

  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({
    upcoming: 0,
    patients: 0,
    checkedIn: 0,
    messages: 0,
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:3000/api/appointments/doctor",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = res.data;
      setAppointments(data);

      const upcoming = data.filter(
        (a) => a.status === "PENDING" || a.status === "APPROVED"
      ).length;

      const checkedIn = data.filter((a) => a.status === "COMPLETED").length;

      const uniquePatients = new Set(data.map((a) => a.patientId)).size;

      setStats({
        upcoming,
        patients: uniquePatients,
        checkedIn,
        messages: 0,
      });
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  const statCards = [
    {
      id: 1,
      label: "Upcoming",
      value: stats.upcoming,
      icon: CalendarDays,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      id: 2,
      label: "Patients",
      value: stats.patients,
      icon: Users,
      color: "bg-slate-100 text-slate-700",
    },
    {
      id: 3,
      label: "Completed",
      value: stats.checkedIn,
      icon: UserCheck,
      color: "bg-teal-100 text-teal-600",
    },
    {
      id: 4,
      label: "Messages",
      value: stats.messages,
      icon: MessageCircle,
      color: "bg-cyan-100 text-cyan-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex">
      
      <aside className="hidden md:block">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col">

        <main className="p-6">

          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Welcome back 👋
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Here’s what’s happening with your account today.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {statCards.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.id}
                  className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition flex items-center gap-4"
                >
                  <div className={`p-3 rounded-lg ${s.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <div className="text-sm text-gray-500">{s.label}</div>
                    <div className="text-2xl font-semibold text-gray-800 dark:text-white">
                      {s.value}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Appointments + Notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Recent Appointments */}
            <section className="col-span-2 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Recent Appointments
              </h2>

              <div className="space-y-3">
                {appointments.slice(0, 5).map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between p-3 border border-gray-200 dark:border-slate-700 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-gray-800 dark:text-white">
                        {a.patient?.name || "Patient"}
                      </div>

                      <div className="text-sm text-gray-500">
                        {new Date(a.appointmentDate).toLocaleDateString()}{" "}
                        {a.appointmentTime}
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        a.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : a.status === "COMPLETED"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {a.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Notifications */}
            <aside className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Notifications
              </h2>

              <p className="text-sm text-gray-600 dark:text-gray-300">
                You have <strong>0</strong> new notifications.
              </p>

              <div className="mt-6">
                <button
                  onClick={() => navigate("/notification")}
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition"
                >
                  View Messages
                </button>
              </div>
            </aside>

          </div>
        </main>
      </div>
    </div>
  );
}