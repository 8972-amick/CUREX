import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import axios from "axios";

const LicenseVerification = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
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

      setDoctors(res.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleVerify = async (doctorId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:3000/api/admin/verify/${doctorId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchDoctors();
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="hidden md:block">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6">
          <h1 className="text-3xl font-bold mb-6">
            License Verification
          </h1>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">
              Pending Doctor Licenses
            </h2>

            {doctors.length === 0 ? (
              <p className="text-gray-500">
                No pending verification requests.
              </p>
            ) : (
              <div className="space-y-4">
                {doctors.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between border p-4 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">{doc.name}</p>
                      <p className="text-sm text-gray-500">
                        License: {doc.licenseNumber}
                      </p>
                      <p className="text-sm">
                        Status:{" "}
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            doc.isVerified
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-yellow-100 text-amber-700"
                          }`}
                        >
                          {doc.isVerified ? "Verified" : "Pending"}
                        </span>
                      </p>
                    </div>

                    {!doc.isVerified && (
                      <button
                        onClick={() => handleVerify(doc.id)}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
                      >
                        Verify
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default LicenseVerification;
