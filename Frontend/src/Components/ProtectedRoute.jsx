import React from "react";
import { Navigate } from "react-router-dom";

const getRole = () => localStorage.getItem("role");
const isAuthenticated = () => Boolean(localStorage.getItem("token"));

export default function ProtectedRoute({ children, roles = [] }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const role = getRole();
  if (roles.length > 0 && !roles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
