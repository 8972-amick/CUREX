import React from 'react';
import LoginForm from './pages/login.jsx';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home.jsx';
import Navbar from './Components/Navbar.jsx';
import SymptomAnalysis from "./pages/symptomAnalysis.jsx";
import ContactUs from "./pages/contactUs.jsx";
import AboutUs from "./pages/aboutUs.jsx";
import BookAppointment from './pages/BookAppointmnet.jsx';
import MyAppointments from './pages/MyAppointmnets.jsx';
import DoctorDashboard from './pages/DoctorDashboard.jsx'
import Chat from './pages/chat.jsx';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />   
        <Route path="/login" element={<LoginForm />} />
        <Route path="/symptoms" element={<SymptomAnalysis />} />
        <Route path="/contact" element={<ContactUs />} /> 
        <Route path="/about" element={<AboutUs />} /> 
        <Route path="/book" element={<BookAppointment />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/chat" element={<Chat  />} />

      </Routes>
      
    </>
  );
};

export default App;
