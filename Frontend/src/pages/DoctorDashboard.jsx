import { useEffect, useState } from "react";
import axios from "axios";
// import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";


export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Not authenticated. Please log in.");
        return;
      }

      const res = await axios.get(
        "http://localhost:3000/api/appointments/doctor",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAppointments(res.data);
    } catch (err) {
      console.error("Fetch appointments error:", err);
      setError(err.response?.data?.error || "Failed to load appointments");
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:3000/api/appointments/update/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchAppointments();
    } catch (err) {
      console.error("Update appointment error:", err);
      setError(err.response?.data?.error || "Failed to update appointment");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="flex bg-background">
        <Sidebar />

        <div className="flex-1 p-10">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Doctor Dashboard
          </h2>

          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-600">Loading appointments...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              <strong>Error:</strong> {error}
            </div>
          )}

          {!isLoading && appointments.length === 0 && !error && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-lg">No appointments to manage</p>
              <p className="text-gray-500">Your patients will book appointments soon</p>
            </div>
          )}

          <div className="grid gap-6">
            {!isLoading && appointments.map((app) => (
              <div key={app.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                <p><strong>Patient:</strong> {app.patient?.name}</p>
                <p><strong>Date:</strong> {new Date(app.appointmentDate).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {app.appointmentTime}</p>
                <p className="font-semibold mb-3">
                  Status: <span className={app.status === "APPROVED" ? "text-green-600" : app.status === "REJECTED" ? "text-red-600" : "text-yellow-600"}>{app.status}</span>
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => updateStatus(app.id, "APPROVED")}
                    disabled={updatingId === app.id}
                    className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition"
                  >
                    {updatingId === app.id ? "Updating..." : "Approve"}
                  </button>

                  <button
                    onClick={() => updateStatus(app.id, "REJECTED")}
                    disabled={updatingId === app.id}
                    className="bg-danger text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-400 transition"
                  >
                    {updatingId === app.id ? "Updating..." : "Reject"}
                  </button>

                  <button
                    onClick={() => updateStatus(app.id, "COMPLETED")}
                    disabled={updatingId === app.id}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 disabled:bg-gray-400 transition"
                  >
                    {updatingId === app.id ? "Updating..." : "Complete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
