import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useState, useEffect } from "react";

export default function ProtectedRoute({ children, roles = [] }) {
  const { user } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Give context time to hydrate from localStorage
    const timer = setTimeout(() => setIsChecking(false), 100);
    return () => clearTimeout(timer);
  }, []);

  // ⏳ While checking auth state, show nothing
  if (isChecking) {
    return null;
  }

  // Get token from localStorage (source of truth)
  const token = localStorage.getItem("token");
  const storedUser = user || JSON.parse(localStorage.getItem("user") || "null");

  // ❌ Not logged in
  if (!storedUser || !token) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Normalize role (VERY IMPORTANT)
  const userRole = storedUser.role?.toUpperCase();

  // ❌ Role not allowed
  if (roles.length > 0 && !roles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
}