import React, { useEffect } from "react";
import { Route, Routes, useLocation } from 'react-router-dom'
import './index.css'
import HomePage from './Pages/Customer/HomePage/HomePage.tsx'
import RoomDetail from "./Pages/Customer/RoomDetail/RoomDetail.tsx";
import RoomList from "./Pages/Customer/RoomList/RoomList.tsx";

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
        <Route path="/rooms" element={<RoomList />} />
        <Route path="/roomDetail/:1" element={<RoomDetail />} />
      </Routes>
    </>
  )
}

export default App