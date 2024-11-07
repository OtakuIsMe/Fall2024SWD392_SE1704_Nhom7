import React, { useState, useContext, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ComputerIcon from '@mui/icons-material/Computer';
import RoomIcon from '@mui/icons-material/Room';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthenContext } from '../../../Components/AuthenContext';
import './AdminLayout.css';

const AdminLayout: React.FC = () => {

  const context = useContext(AuthenContext);

  if (!context) {
    throw new Error("useAuthenContext must be used within an AuthenProvider");
  }
  
  const { user, logout } = context;

  const roleBasedNavItems = [
    { name: 'Check-in', href: '/check-in', icon: <CalendarMonthRoundedIcon />, roles: ['6489cb2a-f4df-4020-bf31-56f2a19d30c3', '42feaeb5-fc53-4163-98b5-d28cfceafa7c', '5a4226d9-e58a-42c4-a786-dba8369b234b'] },
    { name: 'Dashboard', href: '/dashboard', icon: <AssessmentIcon />, roles: ['6489cb2a-f4df-4020-bf31-56f2a19d30c3', '42feaeb5-fc53-4163-98b5-d28cfceafa7c'] },
    { name: 'Users', href: '/users', icon: <SupervisedUserCircleIcon />, roles: ['6489cb2a-f4df-4020-bf31-56f2a19d30c3', '42feaeb5-fc53-4163-98b5-d28cfceafa7c', '5a4226d9-e58a-42c4-a786-dba8369b234b'] },
    { name: 'Services', href: '/services', icon: <RoomServiceIcon />, roles: ['6489cb2a-f4df-4020-bf31-56f2a19d30c3', '5a4226d9-e58a-42c4-a786-dba8369b234b'] },
    { name: 'Booking Requests', href: '/requests', icon: <LibraryBooksIcon />, roles: ['6489cb2a-f4df-4020-bf31-56f2a19d30c3'] },
    { name: 'PODs / WorkRooms', href: '/rooms', icon: <ComputerIcon />, roles: ['6489cb2a-f4df-4020-bf31-56f2a19d30c3', '42feaeb5-fc53-4163-98b5-d28cfceafa7c'] },
    { name: 'Areas', href: '/areas', icon: <RoomIcon />, roles: ['6489cb2a-f4df-4020-bf31-56f2a19d30c3'] },
    { name: 'Feedbacks & Reports', href: '/feedbacks&reports', icon: <InsertCommentIcon />, roles: ['6489cb2a-f4df-4020-bf31-56f2a19d30c3'] },
    { name: 'Membership', href: '/membership', icon: <AccountBoxIcon />, roles: ['6489cb2a-f4df-4020-bf31-56f2a19d30c3'] },
  ]

  const navigate = useNavigate();

  const initialSelected = parseInt(sessionStorage.getItem('selectedIndex') || '0', 10);
  const [isSelected, setIsSelected] = useState<number>(initialSelected);

  const handleNavigation = (index: number, href: string, isAccessible: boolean) => {
    if (isAccessible) {
      setIsSelected(index);
      sessionStorage.setItem('selectedIndex', index.toString());
      navigate(href);
    }
  };

  const AdHeader: React.FC = () => (
    <div className="ad-header">
      <div className="logo"> 
        <p>WorkChill</p> 
      </div>
      <div className="user">
        <div>
          <AccountCircleIcon sx={{ fontSize: 28 }} />
          <p>{user ? user.email : "User"}</p>
        </div>
        <div onClick={() => { logout(); window.location.reload(); }}>
          <LogoutIcon />
          <p>Log Out</p>
        </div>
      </div>
    </div>
  );

  const SideNav: React.FC = () => (
    <div className='nav-container'>
      {roleBasedNavItems.map((navItem, index) => {
        const isAccessible = navItem.roles.includes(user.roleId);
        return (
          <div
            key={index}
            className={`item${index + 1}`}
            onClick={() => handleNavigation(index, navItem.href, isAccessible)}
            style={{
              color: isAccessible ? (isSelected === index ? "black" : "gray") : "lightgray",
              pointerEvents: isAccessible ? 'auto' : 'none',
              opacity: isAccessible ? 1 : 0.5,
              cursor: isAccessible ? 'pointer' : 'not-allowed'
            }}
          >
            {navItem.icon}
            <p>{navItem.name}</p>
          </div>
        );
      })}
    </div>
  );

  return (
    <div id='ad-layout'>
      <AdHeader />
      <div className="content">
        <div className='ad-sidebar'>
          <SideNav />
        </div>
        <div className='main-content'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
