import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function BookAppointment() {
  const [doctorId, setDoctorId] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/api/appointments/doctors")
      .then((res) => setDoctors(res.data))
      .catch(() => setDoctors([]))
      .finally(() => setLoadingDoctors(false));
  }, []);

  const handleBook = async () => {
    if (!doctorId || !date || !time) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      await api.post(
        "/api/appointments/create",
        {
          doctorId: Number(doctorId),
          appointmentDate: date,
          appointmentTime: time,
        }
      );

      setSuccess(true);
      setDoctorId("");
      setDate("");
      setTime("");
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error("Book appointment error:", err);
      setError(err.response?.data?.error || err.response?.data?.message || "Booking failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div className="flex bg-background">
        <div className="flex-1  p-10">
          <div className="bg-white p-8 rounded-xl shadow-md max-w-lg">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Book Appointment
            </h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                <strong>Error:</strong> {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
                <strong>Success!</strong> Your appointment has been booked.
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
              <select
                className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                disabled={isLoading || loadingDoctors}
              >
                <option value="">{loadingDoctors ? "Loading doctors..." : "Select a doctor"}</option>
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    Dr. {d.name}
                    {d.licenseNumber ? ` (${d.licenseNumber})` : ""}
                  </option>
                ))}
              </select>
              {!loadingDoctors && doctors.length === 0 && (
                <p className="text-sm text-amber-600 -mt-2 mb-2">No verified doctors available yet.</p>
              )}
            </div>

            <input
              type="date"
              className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={isLoading}
            />

            <input
              type="time"
              className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              disabled={isLoading}
            />

            <button
              onClick={handleBook}
              disabled={isLoading}
              className="bg-rose-800 hover:bg-rose-900 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg w-full transition"
            >
              {isLoading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

