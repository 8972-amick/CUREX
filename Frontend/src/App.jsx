import React from 'react'
import Bar from './Components/HomePage.jsx';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<Bar />} />
        <Route path="/history" element={<Bar />} />
        <Route path="/contact" element={<Bar />} />
        <Route path="/aboutus" element={<Bar />} />
      </Routes>
    </div>
  )
}

export default App