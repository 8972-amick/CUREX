import { useEffect, useState } from "react";
import api from "../services/api";


export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await api.get("/api/appointments/patient");

      setAppointments(res.data);
    } catch (err) {
      console.error("Fetch appointments error:", err);
      setError(err.response?.data?.error || "Failed to load appointments");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <main className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          My Appointments
        </h2>

          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-300">Loading appointments...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-4">
              <strong>Error:</strong> {error}
            </div>
          )}

          {!isLoading && appointments.length === 0 && !error && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-lg">No appointments found</p>
              <p className="text-gray-500">Book an appointment to get started</p>
            </div>
          )}

          <div className="grid gap-6">
            {!isLoading && appointments.map((app) => (
              <div
                key={app.id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <p><strong>Doctor:</strong> {app.doctor?.name}</p>
                <p><strong>Date:</strong> {new Date(app.appointmentDate).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {app.appointmentTime}</p>
                <p className="font-semibold">
                  Status: <span className={app.status === "APPROVED" ? "text-green-600" : app.status === "REJECTED" ? "text-red-600" : "text-yellow-600"}>{app.status}</span>
                </p>
              </div>
              
            ))}
          </div>
        </main>
    </div>
  );
}
