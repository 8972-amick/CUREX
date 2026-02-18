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
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/symptoms" element={<SymptomAnalysis />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/book" element={<BookAppointment />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
