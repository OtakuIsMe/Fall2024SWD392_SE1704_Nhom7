import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/Customer/HomePage/HomePage';
import UserPage from './Pages/Customer/UserPage/UserPage';
import './index.css';
import AreaDetails from './Pages/Customer/AreaDetail/AreaDetail';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/areadetails/:locationId" element={<AreaDetails />} />
      </Routes>
    </Router>
  </StrictMode>,
);
