import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import Layout from "./Components/Layout"; 
import PublicLayout from "./Components/PublicLayout"; 
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx"; 
import Register from "./pages/Register.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ContactUs from "./pages/contactUs.jsx";
import PatientDashboard from "./pages/patientDashboard.jsx";
import DoctorDashboard from "./pages/DoctorDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx"; 
import MyAppointments from "./pages/MyAppointments.jsx";
import BookAppointment from "./pages/BookAppointment.jsx";
import SymptomAnalysis from "./pages/symptomAnalysis.jsx"; 
import LicenseVerification from "./pages/LicenseVerification.jsx";
import Chat from "./pages/Chat.jsx";
import Notification from "./pages/Notification.jsx";


export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Route>

       
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        
        <Route
          path="/patient"
          element={
            <ProtectedRoute roles={["PATIENT"]}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<PatientDashboard />} />
          <Route path="my-appointments" element={<MyAppointments />} />
          <Route path="book" element={<BookAppointment />} />
          <Route path="symptoms" element={<SymptomAnalysis />} />
          <Route path="chat" element={<Chat />} />
          <Route path="notifications" element={<Notification />} />
        </Route>

        
        <Route
          path="/doctor"
          element={
            <ProtectedRoute roles={["DOCTOR"]}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DoctorDashboard />} />
          <Route path="license-verification" element={<LicenseVerification />} />
          <Route path="chat" element={<Chat />} />
          <Route path="notifications" element={<Notification />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="notifications" element={<Notification />} />
        </Route>

        <Route
          path="*"
          element={
            <h1 className="font-bold text-3xl text-center text-red-400 p-10">
              404 Not Found
            </h1>
          }
        />

      </Routes>
    </AuthProvider>
  );
}