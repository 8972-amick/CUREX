import { useEffect, useState } from "react";
import api from "../services/api";
import { CheckCircle, XCircle, Clock, User, CalendarDays, Timer, RefreshCw } from "lucide-react";

const STATUS_CONFIG = {
  APPROVED: {
    label: "Approved",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/30",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  REJECTED: {
    label: "Rejected",
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-900/30",
    border: "border-red-200 dark:border-red-800",
  },
  PENDING: {
    label: "Pending",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-900/30",
    border: "border-amber-200 dark:border-amber-800",
  },
  COMPLETED: {
    label: "Completed",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-900/30",
    border: "border-blue-200 dark:border-blue-800",
  },
};

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
      const res = await api.get("/api/appointments/doctor");
      setAppointments(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load appointments");
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);
      await api.put(`/api/appointments/update/${id}`, { status });
      fetchAppointments();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update appointment");
    } finally {
      setUpdatingId(null);
    }
  };

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === "PENDING").length,
    approved: appointments.filter((a) => a.status === "APPROVED").length,
    completed: appointments.filter((a) => a.status === "COMPLETED").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <main className="max-w-5xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Doctor Dashboard
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage your patient appointments
            </p>
          </div>
          <button
            onClick={fetchAppointments}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Stats Row */}
        {!isLoading && appointments.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total", value: stats.total, color: "text-gray-700 dark:text-gray-200", bg: "bg-white dark:bg-slate-800" },
              { label: "Pending", value: stats.pending, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20" },
              { label: "Approved", value: stats.approved, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
              { label: "Completed", value: stats.completed, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20" },
            ].map((s) => (
              <div key={s.label} className={`${s.bg} border border-gray-100 dark:border-slate-700 rounded-xl p-4 text-center`}>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Loading appointments...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl mb-6 text-sm">
            <XCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span><strong>Error:</strong> {error}</span>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && appointments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-4">
              <CalendarDays className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-1">No appointments yet</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Your patients will book appointments soon.</p>
          </div>
        )}

        {/* Appointment Cards */}
        {!isLoading && (
          <div className="flex flex-col gap-4">
            {appointments.map((app) => {
              const statusCfg = STATUS_CONFIG[app.status] || STATUS_CONFIG.PENDING;
              const isUpdating = updatingId === app.id;

              return (
                <div
                  key={app.id}
                  className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    {/* Info */}
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
                        <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      </div>

                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-base">
                          {app.patient?.name || "Unknown Patient"}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <CalendarDays className="w-3.5 h-3.5" />
                            {new Date(app.appointmentDate).toLocaleDateString("en-US", {
                              weekday: "short", month: "short", day: "numeric"
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Timer className="w-3.5 h-3.5" />
                            {app.appointmentTime}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusCfg.bg} ${statusCfg.color} ${statusCfg.border} self-start`}>
                      {statusCfg.label}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-slate-700">
                    <ActionButton
                      label="Approve"
                      icon={<CheckCircle className="w-4 h-4" />}
                      onClick={() => updateStatus(app.id, "APPROVED")}
                      disabled={isUpdating || app.status === "APPROVED"}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white"
                    />
                    <ActionButton
                      label="Reject"
                      icon={<XCircle className="w-4 h-4" />}
                      onClick={() => updateStatus(app.id, "REJECTED")}
                      disabled={isUpdating || app.status === "REJECTED"}
                      className="bg-red-500 hover:bg-red-600 text-white"
                    />
                    <ActionButton
                      label="Complete"
                      icon={<Clock className="w-4 h-4" />}
                      onClick={() => updateStatus(app.id, "COMPLETED")}
                      disabled={isUpdating || app.status === "COMPLETED"}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    />
                    {isUpdating && (
                      <span className="text-xs text-gray-400 dark:text-gray-500 self-center ml-1">Updating...</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

function ActionButton({ label, icon, onClick, disabled, className }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
    >
      {icon}
      {label}
    </button>
  );
}