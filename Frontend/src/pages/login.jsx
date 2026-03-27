import api from "../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      if (role === "DOCTOR") navigate("/doctor");
      else if (role === "ADMIN") navigate("/admin");
      else navigate("/patient");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("Please fill in all fields");
      return;
    }

    try {
      const res = await api.post("/api/auth/logIn", {
        email,
        password,
      });

      if (res.status === 200 && res.data.token) {
        const user = res.data.user;

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("userId", user.id); // ✅ Store userId separately
        localStorage.setItem("role", user.role || "PATIENT");

        toast.success("Login successful 🎉");

        
        if (user.role === "DOCTOR") {
          navigate("/doctor");
        } else if (user.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/patient");
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
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,78,59,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(6,78,59,0.08)_1px,transparent_1px)] bg-[size:48px_48px] opacity-60" />

      <div className="w-full max-w-[420px] relative z-10">
        <div className="bg-slate-800/80 rounded-3xl shadow-2xl p-10">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white">CUREX</h1>
            <p className="text-slate-400">
              Welcome back — sign in to continue
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border text-white"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border text-white"
            />

            <button
              type="submit"
              className="w-full py-3 bg-emerald-500 text-white rounded-xl"
            >
              Sign in
            </button>
          </form>

          {/* Register */}
          <p className="text-center text-sm text-slate-400 mt-6">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-emerald-400 cursor-pointer"
            >
              Create one
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}