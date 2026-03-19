import React from 'react';
import { useLocation } from 'react-router-dom';
import AppRoutes from './Components/Routes.jsx';
import Navbar from './Components/Navbar.jsx';

const App = () => {
  const location = useLocation();
  const hideNavbarFor = ['/login', '/register'];

  return (
    <>
      {!hideNavbarFor.includes(location.pathname) && <Navbar />}
      <AppRoutes />
    </>
  );
};

export default App;
