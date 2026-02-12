import { useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";


export default function BookAppointment() {
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleBook = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:3000/api/appointments/book",
        {
          doctorId,
          appointmentDate: date,
          appointmentTime: time,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Appointment Booked Successfully!");
      setDoctorId("");
      setDate("");
      setTime("");
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex bg-background">
        <Sidebar />

        <div className="flex-1 p-10">
          <div className="bg-white p-8 rounded-xl shadow-md max-w-lg">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Book Appointment
            </h2>

            <input
              type="number"
              placeholder="Doctor ID"
              className="w-full border p-3 rounded-lg mb-4"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
            />

            <input
              type="date"
              className="w-full border p-3 rounded-lg mb-4"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <input
              type="time"
              className="w-full border p-3 rounded-lg mb-4"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />

            <button
              onClick={handleBook}
              className="bg-secondary hover:bg-green-600 text-white px-6 py-3 rounded-lg w-full transition"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
