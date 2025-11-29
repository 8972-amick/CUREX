import React from 'react'
import Bar from './Components/HomePage.jsx';
import LoginForm from './pages/login.jsx';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home.jsx';

const App = () => {
  return (
    <div>
        <>
      <Bar /> 
      <Routes>
        <Route path="/home" element={<Home />} />   
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </>

    </div>
  )
}

export default App