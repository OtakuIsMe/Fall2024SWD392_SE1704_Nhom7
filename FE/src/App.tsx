import React, { useEffect } from "react";
import { Route, Routes, useLocation } from 'react-router-dom'
import './index.css'
import HomePage from './Pages/Customer/HomePage/HomePage.tsx'
import RoomDetail from "./Pages/Customer/RoomDetail/RoomDetail.tsx";
import AreaDetail from "./Pages/Customer/AreaDetail/AreaDetail.tsx";
import RoomList from "./Pages/Customer/RoomList/RoomList.tsx";
import DashBoard from "./Pages/Admin/Dashboard/DashBoard.tsx";
import AuthenProvider from "./Components/AuthenContext.tsx";

const App: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      window.history.replaceState(null, "/");
    }
  }, [location]);

  return (
    <>
      <AuthenProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rooms" element={<RoomList />} />
          <Route path="/roomDetail/:roomHashing" element={<RoomDetail />} />
          <Route path="/areadetails/:locationId" element={<AreaDetail />} />
          <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
      </AuthenProvider>
    </>
  )
}

export default App