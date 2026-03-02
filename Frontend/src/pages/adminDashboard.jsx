import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Sidebar from "../Components/Sidebar";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    pendingDoctors: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:3000/api/admin/doctors",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const doctors = res.data;

      setStats({
        totalDoctors: doctors.length,
        pendingDoctors: doctors.filter(d => !d.isVerified).length,
      });

    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">
            Admin Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold">
                Total Doctors
              </h2>
              <p className="text-3xl font-bold mt-2">
                {stats.totalDoctors}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-semibold">
                Pending Verification
              </h2>
              <p className="text-3xl font-bold mt-2 text-yellow-600">
                {stats.pendingDoctors}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;