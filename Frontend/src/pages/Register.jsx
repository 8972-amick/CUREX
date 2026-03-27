import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PATIENT");
  const [licenseNumber, setLicenseNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.warning("Please fill in all fields");
      return;
    }

    if (role === "DOCTOR" && !licenseNumber.trim()) {
      toast.warning("Doctor must have license number");
      return;
    }

    try {
      const payload = {
        name,
        email,
        password,
        role,
        licenseNumber: role === "DOCTOR" ? licenseNumber : null,
      };

      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        payload
      );

      if (res.status === 201) {
        toast.success("Registered successfully 🎉");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-slate-950 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,78,59,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(6,78,59,0.07)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-teal-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl shadow-black/60 p-10">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-2xl shadow-lg shadow-emerald-500/30 mb-4">
              🩺
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Create account
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Join thousands of healthcare professionals
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Full name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-950/80 border border-slate-700/60 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400/70 hover:border-slate-500/80 hover:bg-slate-900/80 transition-all duration-300 text-sm shadow-inner shadow-black/20"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-950/80 border border-slate-700/60 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400/70 hover:border-slate-500/80 hover:bg-slate-900/80 transition-all duration-300 text-sm shadow-inner shadow-black/20"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Password
              </label>
              <input
                type="password"
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-950/80 border border-slate-700/60 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400/70 hover:border-slate-500/80 hover:bg-slate-900/80 transition-all duration-300 text-sm shadow-inner shadow-black/20"
              />
            </div>

            {/* Role */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest">
                I am a
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-950/80 border border-slate-700/60 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400/70 hover:border-slate-500/80 hover:bg-slate-900/80 transition-all duration-300 text-sm shadow-inner shadow-black/20 cursor-pointer appearance-none"
              >
                <option value="PATIENT">🧑‍⚕️ Patient</option>
                <option value="DOCTOR">👨‍⚕️ Doctor</option>
                <option value="ADMIN">🛡️ Admin</option>
              </select>
            </div>

            {/* Doctor License */}
            {role === "DOCTOR" && (
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  Medical License Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. NMC-12345"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-700/40 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400/70 hover:border-emerald-600/60 transition-all duration-300 text-sm shadow-inner shadow-black/20"
                />
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 text-white font-bold text-sm tracking-widest uppercase shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/50 hover:from-emerald-400 hover:via-teal-300 hover:to-cyan-400 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-1"
            >
              Create account →
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-emerald-400 font-medium cursor-pointer hover:text-emerald-300 transition-colors duration-200"
            >
              Sign in
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}