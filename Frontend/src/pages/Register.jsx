import React from "react";
// import axios from "axios";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

export default function Register() {
  // FRONTEND ONLY — comment out all backend/state logic
  const navigate = useNavigate();

  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [role, setRole] = useState("PATIENT");
  // const [licenseNumber, setLicenseNumber] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!name || !email || !password) {
  //     toast.warning("Please fill in all fields");
  //     return;
  //   }

  //   if (role === "DOCTOR" && !licenseNumber.trim()) {
  //     toast.warning("Please provide a valid license number for doctor role");
  //     return;
  //   }

  //   try {
  //     const res = await axios.post(`${backend}/api/auth/register`, {
  //       name,
  //       email,
  //       password,
  //       role,
  //       licenseNumber,
  //     });

  //     if (res.status === 201) {
  //       toast.success("Registration successful 🎉");
  //       navigate("/login");
  //     }
  //   } catch (err) {
  //     toast.error(
  //       err?.response?.data?.message || "Registration failed"
  //     );
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#0f172a] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,78,59,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(6,78,59,0.08)_1px,transparent_1px)] bg-[size:48px_48px] opacity-60" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="w-full max-w-[420px] relative z-10">
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-3xl shadow-lg shadow-emerald-500/20">
              🩺
            </div>
            <h1 className="mt-5 text-2xl font-bold text-white tracking-tight">
              CUREX
            </h1>
            <h2 className="mt-2 text-slate-400 text-base">
              Create your account
            </h2>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Full name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                // value={name}
                // onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                I am a
              </label>
              <select
                // value={role}
                // onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
              >
                <option value="PATIENT">Patient</option>
                <option value="DOCTOR">Doctor</option>
              </select>
            </div>

            {/* Doctor license input commented out */}
            {/* {role === "DOCTOR" && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Medical License Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. NMC-12345"
                  // value={licenseNumber}
                  // onChange={(e) => setLicenseNumber(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
                />
              </div>
            )} */}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-base shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:opacity-95 transition-all mt-2"
            >
              Create account
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-emerald-400 font-medium cursor-pointer hover:text-emerald-300 transition"
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}