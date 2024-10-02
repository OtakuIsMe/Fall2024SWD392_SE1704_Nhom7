import React, { useEffect } from "react";
import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './Pages/Customer/HomePage/HomePage.tsx'
import './index.css'

const App: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        // Replace the current URL with '/'
        if (location.pathname !== "/") {
        window.history.replaceState(null, "/");
        }
    }, [location]);
  return (
    <>
        <Routes>
            <Route path="/" element={<HomePage />} /> 
        </Routes>
    </>
  )
}

export default App