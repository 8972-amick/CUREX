import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const backend = "http://localhost:3000";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.post(`${backend}/api/auth/logIn`, {
        email,
        password,
      });

      if (res.status === 200 && res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.user.id);
        localStorage.setItem("userName", res.data.user.name);
        localStorage.setItem("role", res.data.user.role || "PATIENT");
        toast.success("Login successful 🎉");

        const userRole = res.data.user.role || "PATIENT";
        if (userRole === "DOCTOR") {
          navigate("/dashboard");
        } else if (userRole === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/patient-dashboard");
        }
      }
    } catch (err) {
      console.error("Login error:", err?.response?.data || err);
      toast.error(
        err?.response?.data?.message || "Invalid email or password"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#0f172a] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,78,59,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(6,78,59,0.08)_1px,transparent_1px)] bg-[size:48px_48px] opacity-60" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />

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
              Welcome back — sign in to continue
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-base shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:opacity-95 transition-all"
            >
              Sign in
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-emerald-400 font-medium cursor-pointer hover:text-emerald-300 transition"
            >
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
