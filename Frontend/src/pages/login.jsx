import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const backend = "http://localhost:3000";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backend}/api/auth/logIn`, {
        email,
        password,
      });

      if (response.status === 200) {
        // handle multiple possible response shapes
        const token = response.data.token || response.data.jwtToken || response.data?.token;
        const user = response.data.user || (response.data.email ? { email: response.data.email, name: response.data.name } : null);

        if (token) localStorage.setItem("token", token);
        if (user) localStorage.setItem("user", JSON.stringify(user));

        alert("Login successful");
        navigate("/");
      } else {
        const msg = response.data?.message || "Login failed";
        alert(msg);
      }
    } catch (error) {
      console.error("Login error:", error?.response || error);
      const message = error?.response?.data?.message || error.message || "Something went wrong";
      alert(message);
    }
  };

  const verifyToken = () => {
    
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center mb-4 text-black-600 text-4xl">
          <span>👤</span>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-black-700">
          CUREX Login
        </h2>

        <label className="block text-gray-600 text-sm mb-1">Email</label>
        <input
          type="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />

        <label className="block text-gray-600 text-sm mb-1">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-green-700 hover:text-black transition hover:cursor-pointer text-xl"
        >
          Login
        </button>
      </form>
    </div>
  );
}
