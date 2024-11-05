import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Favorite, Receipt, Book, Lock } from '@mui/icons-material';
import './Sidebar.css'; // Tạo CSS phù hợp để thêm style

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <NavLink to="/" className="sidebar-link">
            <Home /> Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className="sidebar-link" activeClassName="active">
            <Home /> User Info
          </NavLink>
        </li>
        <li>
          <NavLink to="/favorites" className="sidebar-link" activeClassName="active">
            <Favorite /> Favorites
          </NavLink>
        </li>
        <li>
          <NavLink to="/transaction-history" className="sidebar-link" activeClassName="active">
            <Receipt /> Transaction History
          </NavLink>
        </li>
        <li>
          <NavLink to="/pending-bookings" className="sidebar-link" activeClassName="active">
            <Book /> Pending Bookings
          </NavLink>
        </li>
        <li>
          <NavLink to="/reset-password" className="sidebar-link" activeClassName="active">
            <Lock /> Reset Password
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
