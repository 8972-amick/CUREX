import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar.jsx";
import Sidebar from "../Components/Sidebar.jsx";


export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:3000/api/appointments/patient",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setAppointments(res.data);
  };

  return (
    <>
      <Navbar />
      <div className="flex bg-background">
        <Sidebar />

        <div className="flex-1 p-10">
          <h2 className="text-2xl font-bold text-primary mb-6">
            My Appointments
          </h2>

          <div className="grid gap-6">
            {appointments.map((app) => (
              <div
                key={app.id}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <p><strong>Doctor:</strong> {app.doctor?.name}</p>
                <p><strong>Date:</strong> {new Date(app.appointmentDate).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {app.appointmentTime}</p>
                <p className="font-semibold">
                  Status: {app.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
