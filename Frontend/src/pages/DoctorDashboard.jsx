import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/appointments/doctor",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setAppointments(res.data);
  };

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/appointments/update/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchAppointments();
  };

  return (
    <>
      <Navbar />
      <div className="flex bg-background">
        <Sidebar />

        <div className="flex-1 p-10">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Doctor Dashboard
          </h2>

          <div className="grid gap-6">
            {appointments.map((app) => (
              <div key={app.id} className="bg-white p-6 rounded-xl shadow-md">
                <p><strong>Patient:</strong> {app.patient?.name}</p>
                <p><strong>Date:</strong> {new Date(app.appointmentDate).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {app.appointmentTime}</p>
                <p className="font-semibold mb-3">
                  Status: {app.status}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => updateStatus(app.id, "APPROVED")}
                    className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(app.id, "REJECTED")}
                    className="bg-danger text-white px-4 py-2 rounded-lg"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => updateStatus(app.id, "COMPLETED")}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                  >
                    Complete
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
