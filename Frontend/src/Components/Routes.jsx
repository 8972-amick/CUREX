import React from "react";
import Home from "../pages/home";
import LoginForm from "../pages/login";
import ContactUs from "../pages/contactUs";
import Aboutus from "../pages/aboutUs";
import BookAppointment from "../pages/BookAppointmnet";
import DoctorDashboard from "../pages/DoctorDashboard";
import Notification from "../pages/Notification";
import Dashboard from "../pages/Dashboard";
import MyAppointments from "../pages/MyAppointmnets";
import Chat from "../pages/chat";
import SymptomAnalysis from "../pages/symptomAnalysis";
import LicenseVerification from "../pages/LicenseVerification";
import PatientDashboard from "../pages/patientDashboard.jsx";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../pages/adminDashboard.jsx";
import RegisterForm from "../pages/RegisterForm.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/symptoms" element={<SymptomAnalysis />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<Aboutus />} />
        <Route
          path="/book"
          element={
            <ProtectedRoute roles={["PATIENT"]}>
              <BookAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-appointments"
          element={
            <ProtectedRoute roles={["PATIENT"]}>
              <MyAppointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor"
          element={
            <ProtectedRoute roles={["DOCTOR"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/chat" element={<Chat />} />
        <Route path="/notification" element={<Notification />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["DOCTOR"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/license-verification" element={<LicenseVerification />} />
        <Route
          path="/patient-dashboard"
          element={
            <ProtectedRoute roles={["PATIENT"]}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default AppRoutes;
