import React from 'react';
import LoginForm from './pages/login.jsx';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home.jsx';
import Navbar from './Components/Navbar.jsx';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />   
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </>
  );
};

export default App;
