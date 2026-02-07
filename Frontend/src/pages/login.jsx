import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const backend = "http://localhost:3000";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Redirect if already logged in
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
        toast.success("Login successful 🎉");
        navigate("/");
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Invalid email or password"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 px-4">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-2xl shadow-sm">
            🩺
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-800">
            Welcome back
          </h2>
          <p className="text-gray-500 mt-1">
            Sign in to your CUREX account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                📧
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-400 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                🔒
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-400 outline-none"
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-emerald-500 text-white font-semibold text-lg shadow-md hover:bg-emerald-600 transition-all"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <span className="text-emerald-600 font-medium cursor-pointer hover:underline">
            Contact Admin
          </span>
        </p>
      </div>
    </div>
  );
}
