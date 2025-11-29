import React from 'react'
import Bar from './Components/HomePage.jsx';
import LoginForm from './pages/login.jsx';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Bar />} />
        <Route path="/dashboard" element={<Bar />} />
        <Route path="/history" element={<Bar />} />
        <Route path="/contact" element={<Bar />} />
        <Route path="/aboutus" element={<Bar />} />
      </Routes>
    </div>
  )
}

export default App