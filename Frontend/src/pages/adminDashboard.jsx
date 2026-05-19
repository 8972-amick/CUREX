import React, { useEffect, useState } from "react";
import api from "../services/api";

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [stats, setStats] = useState({ totalDoctors: 0, verified: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/api/admin/doctors");
      const doctorData = res.data;
      setDoctors(doctorData);

      const totalDoctors = doctorData.length;
      const verified = doctorData.filter((d) => d.isVerified).length;
      const pending = doctorData.filter((d) => !d.isVerified).length;

      setStats({ totalDoctors, verified, pending });
    } catch (err) {
      console.error("Error fetching doctors:", err?.response?.data || err);
      setError(err.response?.data?.message || "Failed to load doctor stats");
    } finally {
      setLoading(false);
    }
  };

  const verifyDoctor = async (id) => {
    try {
      await api.put(`/api/admin/doctors/${id}/verify`, {});
      await fetchDoctors();
    } catch (err) {
      console.error("Error verifying doctor:", err?.response?.data || err);
      setError(err.response?.data?.message || "Failed to verify doctor");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-slate-900">
      <div className="flex-1 flex flex-col">
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Manage doctors and verify accounts from one place.
            </p>
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Doctors</div>
              <div className="text-2xl font-semibold text-gray-800 dark:text-white">{stats.totalDoctors}</div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <div className="text-sm text-gray-500 dark:text-gray-400">Verified Doctors</div>
              <div className="text-2xl font-semibold text-green-600 dark:text-green-400">{stats.verified}</div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <div className="text-sm text-gray-500 dark:text-gray-400">Pending Verification</div>
              <div className="text-2xl font-semibold text-yellow-600 dark:text-yellow-300">{stats.pending}</div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <div className="text-sm text-gray-500 dark:text-gray-400">Pending Ratio</div>
              <div className="text-2xl font-semibold text-indigo-600 dark:text-indigo-300">
                {stats.totalDoctors > 0 ? `${((stats.pending / stats.totalDoctors) * 100).toFixed(1)}%` : "0%"}
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Doctor Verification Queue</h2>
              <button onClick={fetchDoctors} className="text-sm px-3 py-1 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">Refresh</button>
            </div>

            {loading ? (
              <p className="text-gray-500">Loading doctors...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : doctors.length === 0 ? (
              <p className="text-gray-600">No doctors found.</p>
            ) : (
              <div className="space-y-3">
                {doctors.map((doc) => (
                  <div key={doc.id} className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">{doc.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-300">{doc.email}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-300">License: {doc.licenseNumber || "N/A"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${doc.isVerified ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-800"}`}>
                        {doc.isVerified ? "Verified" : "Pending"}
                      </span>
                      {!doc.isVerified && (
                        <button onClick={() => verifyDoctor(doc.id)} className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                          Verify
                        </button>
                      )}
                    </div>
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

export default AdminDashboard;