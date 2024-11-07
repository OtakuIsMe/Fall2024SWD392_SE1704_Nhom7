import React, { useEffect } from "react";
import { Route, Routes, useLocation } from 'react-router-dom'
import './index.css'
import HomePage from './Pages/Customer/HomePage/HomePage.tsx'
import RoomDetail from "./Pages/Customer/RoomDetail/RoomDetail.tsx";
import AreaDetail from "./Pages/Customer/AreaDetail/AreaDetail.tsx";
import RoomList from "./Pages/Customer/RoomList/RoomList.tsx";
import DashBoard from "./Pages/Admin/Dashboard/DashBoard.tsx";
import AuthenProvider from "./Components/AuthenContext.tsx";
import AdminLayout from "./Pages/Admin/AdminLayout/AdminLayout.tsx";
import UserManagement from "./Pages/Admin/UserManagement/UserManagement.tsx";
import AreaManagement from "./Pages/Admin/AreaManagement/AreaManagement.tsx";
import ServiceManagement from "./Pages/Admin/ServiceManagement/ServiceManagement.tsx";
import RequestManagement from "./Pages/Admin/RequestManagement/RequestManagement.tsx";
import RoomManagement from "./Pages/Admin/RoomManagement/RoomManagement.tsx";
import FRManagement from "./Pages/Admin/F&RManagement/F&RManagement.tsx";
import MembershipManagement from "./Pages/Admin/MembershipManagement/MembershipManagement.tsx";
import TransactionHistory from "./Pages/Customer/ProfilePage/TransactionHistory/TransactionHistory.tsx";
import FavoriteList from "./Pages/Customer/ProfilePage/FavoriteList/FavoriteList.tsx";
import { Login } from "./Pages/Login/Login.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import ResetPassword from "./Pages/Customer/ProfilePage/ResetPassword/ResetPassword.tsx";

import Profile from "./Pages/Customer/ProfilePage/Profile/Profile.tsx";
import { Register } from "./Pages/Register/Register.tsx";
import CheckIn from "./Pages/Admin/CheckIn/CheckIn.tsx";
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
          <Route path="/login" element={<Login />} />
          <Route path="/roomlist" element={<RoomList />} />
          <Route path="/roomDetail/:roomHashing" element={<RoomDetail />} />
          <Route path="/areadetails/:locationId" element={<AreaDetail />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
          <Route path="/favorites" element={<FavoriteList />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/favorites" element={<FavoriteList />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />\
          

          <Route element={<ProtectedRoute allowedRoles={['6489cb2a-f4df-4020-bf31-56f2a19d30c3']} />}>
            <Route path="/" element={<AdminLayout />}>
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/check-in" element={<CheckIn />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/services" element={<ServiceManagement />} />
              <Route path="/requests" element={<RequestManagement />} />
              <Route path="/rooms" element={<RoomManagement />} />
              <Route path="/feedbacks&reports" element={<FRManagement />} />
              <Route path="/areas" element={<AreaManagement />} />
              <Route path="/membership" element={<MembershipManagement />} />
            </Route>
          </Route>

          {/* Manager's Accessible Routes */}
          <Route element={<ProtectedRoute allowedRoles={['6489cb2a-f4df-4020-bf31-56f2a19d30c3', '42feaeb5-fc53-4163-98b5-d28cfceafa7c']} />}>
            <Route path="/" element={<AdminLayout />}>
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/check-in" element={<CheckIn />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/services" element={<ServiceManagement />} />
              <Route path="/requests" element={<RequestManagement />} />
              <Route path="/rooms" element={<RoomManagement />} />
              <Route path="/feedbacks&reports" element={<FRManagement />} />
              <Route path="/membership" element={<MembershipManagement />} />
              {/* Excluding "/areas" for Managers */}
            </Route>
          </Route>

          {/* Staff's Accessible Routes */}
          <Route element={<ProtectedRoute allowedRoles={['6489cb2a-f4df-4020-bf31-56f2a19d30c3', '5a4226d9-e58a-42c4-a786-dba8369b234b']} />}>
            <Route path="/" element={<AdminLayout />}>
              <Route path="/check-in" element={<CheckIn />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/services" element={<ServiceManagement />} />
              {/* Staff only has access to "/users" and "/services" */}
            </Route>
          </Route>
        </Routes>
      </AuthenProvider>
    </>
  )
}

export default App