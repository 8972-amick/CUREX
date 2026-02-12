import React from 'react';
import LoginForm from './pages/login.jsx';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home.jsx';
import Navbar from './Components/Navbar.jsx';
import SymptomAnalysis from "./pages/symptomAnalysis.jsx";
import ContactUs from "./pages/contactUs.jsx";
import AboutUs from "./pages/aboutUs.jsx";

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
      </Routes>
    </>
  );
};

export default App;
