import React, { useEffect } from "react";
import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './Pages/Customer/HomePage/HomePage.tsx'
import RoomDetail from "./Pages/Customer/RoomDetail/RoomDetail.tsx";
import './index.css'

const App: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      window.history.replaceState(null, "/");
    }
  }, [location]);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/room/:hashcode" element={<RoomDetail />} />
      </Routes>
    </>
  )
}

export default App