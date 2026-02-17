import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import { CalendarDays, UserCheck, Users, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();

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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = res.data;
      setAppointments(data);

      // Dynamic Stats
      const upcoming = data.filter(
        (a) => a.status === "PENDING" || a.status === "APPROVED",
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
      color: "bg-rose-100 text-rose-600",
    },
    {
      id: 2,
      label: "Patients",
      value: stats.patients,
      icon: Users,
      color: "bg-amber-100 text-amber-600",
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
      color: "bg-sky-100 text-sky-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="hidden md:block">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col">
        <header>
          <Navbar />
        </header>

        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-sm text-gray-600">
              Here’s what’s happening with your account today.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {statCards.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.id}
                  className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4"
                >
                  <div className={`p-3 rounded-md ${s.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">{s.label}</div>
                    <div className="text-2xl font-semibold">{s.value}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Appointments Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section className="col-span-2 bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">
                Recent Appointments
              </h2>

              <div className="space-y-3">
                {appointments.slice(0, 5).map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between p-3 border rounded-md"
                  >
                    <div>
                      <div className="font-medium">
                        {a.patient?.name || "Patient"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(a.appointmentDate).toLocaleDateString()}{" "}
                        {a.appointmentTime}
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        a.status === "PENDING"
                          ? "bg-yellow-100 text-amber-700"
                          : a.status === "COMPLETED"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-sky-100 text-sky-700"
                      }`}
                    >
                      {a.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Notifications */}
            <aside className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Notifications</h2>
              <p className="text-sm text-gray-600">
                You have <strong>0</strong> new notifications.
              </p>

              <div className="mt-4">
                <button
                  onClick={() => navigate("/notification")}
                  className="w-full py-2 bg-rose-600 text-white rounded-md"
                >
                  View messages
                </button>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
