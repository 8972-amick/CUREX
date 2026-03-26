import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { CalendarDays, Clock, Stethoscope, CheckCircle, XCircle, ChevronDown } from "lucide-react";

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
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get("/api/appointments/doctors");
        setDoctors(res.data || []);
      } catch (err) {
        console.error("Fetch doctors error:", err);
        setDoctors([]);
      } finally {
        setLoadingDoctors(false);
      }
    };
    fetchDoctors();
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

      await api.post("/api/appointments/create", {
        doctorId: Number(doctorId),
        appointmentDate: date,
        appointmentTime: time,
      });

      setSuccess(true);
      setDoctorId("");
      setDate("");
      setTime("");

      setTimeout(() => navigate("/patient/my-appointments"), 1500);
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Booking failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const selectedDoctor = doctors.find((d) => String(d.id) === String(doctorId));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex justify-center items-start p-6 pt-10">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Book Appointment
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Fill in the details below to schedule your visit
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl mb-4 text-sm">
            <XCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span><strong>Error:</strong> {error}</span>
          </div>
        )}
        {success && (
          <div className="flex items-start gap-3 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 px-4 py-3 rounded-xl mb-4 text-sm">
            <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span><strong>Success!</strong> Appointment booked. Redirecting...</span>
          </div>
        )}

        {/* Card */}
        <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-sm p-6 flex flex-col gap-5">

          {/* Doctor */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Stethoscope className="w-4 h-4 text-emerald-500" />
              Select Doctor
            </label>
            <div className="relative">
              <select
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                disabled={isLoading || loadingDoctors}
                className="w-full appearance-none bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-800 dark:text-gray-100 text-sm px-4 py-3 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition disabled:opacity-50"
              >
                <option value="">
                  {loadingDoctors ? "Loading doctors..." : "Choose a doctor"}
                </option>
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    Dr. {d.name}{d.licenseNumber ? ` — ${d.licenseNumber}` : ""}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Selected doctor preview */}
            {selectedDoctor && (
              <div className="mt-2 flex items-center gap-2 px-3 py-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-xl">
                <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {selectedDoctor.name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                    Dr. {selectedDoctor.name}
                  </p>
                  {selectedDoctor.licenseNumber && (
                    <p className="text-xs text-emerald-600 dark:text-emerald-500">
                      License: {selectedDoctor.licenseNumber}
                    </p>
                  )}
                </div>
              </div>
            )}

            {!loadingDoctors && doctors.length === 0 && (
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                No doctors available at the moment.
              </p>
            )}
          </div>

          {/* Date + Time row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <CalendarDays className="w-4 h-4 text-emerald-500" />
                Date
              </label>
              <input
                type="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={isLoading}
                className="w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-800 dark:text-gray-100 text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition disabled:opacity-50"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Clock className="w-4 h-4 text-emerald-500" />
                Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                disabled={isLoading}
                className="w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-800 dark:text-gray-100 text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition disabled:opacity-50"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleBook}
            disabled={isLoading || success}
            className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold py-3 rounded-xl transition-all"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Booking...
              </>
            ) : (
              <>
                <CalendarDays className="w-4 h-4" />
                Confirm Booking
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  );
}