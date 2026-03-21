import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import axios from "axios";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({ upcoming: 0, approved: 0, rejected: 0, completed: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "PATIENT") {
      navigate("/");
      return;
    }

    fetchPatientAppointments();
  }, [navigate]);

  const fetchPatientAppointments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/appointments/patient", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data;
      setAppointments(data);

      const upcoming = data.filter((a) => a.status === "PENDING").length;
      const approved = data.filter((a) => a.status === "APPROVED").length;
      const rejected = data.filter((a) => a.status === "REJECTED").length;
      const completed = data.filter((a) => a.status === "COMPLETED").length;

      setStats({ upcoming, approved, rejected, completed });
    } catch (err) {
      console.error("Patient dashboard error:", err?.response?.data || err);
      setError(err.response?.data?.error || "Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const nextAppointment = appointments
    .filter((a) => a.status === "APPROVED")
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))[0];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex">
      <aside className="hidden md:block">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col">
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Patient Dashboard</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">Track your appointments, health tasks, and active care from one place.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {[
              { label: "Upcoming", value: stats.upcoming },
              { label: "Approved", value: stats.approved },
              { label: "Rejected", value: stats.rejected },
              { label: "Completed", value: stats.completed },
            ].map((item) => (
              <div key={item.label} className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition">
                <div className="text-sm text-gray-500 dark:text-gray-300">{item.label}</div>
                <div className="text-2xl font-semibold text-gray-800 dark:text-white">{item.value}</div>
              </div>
            ))}
          </div>

          <section className="mb-8 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Next Appointment</h2>
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : nextAppointment ? (
              <div>
                <p><strong>Doctor:</strong> {nextAppointment.doctor?.name || "Unknown"}</p>
                <p><strong>Date:</strong> {new Date(nextAppointment.appointmentDate).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {nextAppointment.appointmentTime}</p>
                <p><strong>Status:</strong> {nextAppointment.status}</p>
              </div>
            ) : (
              <p className="text-gray-600">No approved upcoming appointment.</p>
            )}
          </section>

          <section className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Recent Appointments</h2>
              <button
                className="text-sm text-emerald-600 hover:underline"
                onClick={() => navigate("/my-appointments")}
              >
                View all
              </button>
            </div>

            {loading ? (
              <p className="text-gray-500">Loading appointments...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : appointments.length === 0 ? (
              <p className="text-gray-600">You have no appointments yet. Book one now.</p>
            ) : (
              <div className="space-y-3">
                {appointments.slice(0, 5).map((a) => (
                  <div key={a.id} className="border border-gray-200 dark:border-slate-700 rounded-lg p-4">
                    <p><strong>Doctor:</strong> {a.doctor?.name || "Unknown"}</p>
                    <p><strong>Date:</strong> {new Date(a.appointmentDate).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {a.appointmentTime}</p>
                    <p><strong>Status:</strong> {a.status}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;