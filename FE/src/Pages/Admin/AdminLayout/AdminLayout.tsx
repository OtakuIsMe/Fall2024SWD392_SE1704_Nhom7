import React, { useState, useContext } from 'react'
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
import { AuthenContext } from '../../../Components/AuthenContext'
import './AdminLayout.css'

const AdminLayout:React.FC = () => {

  const context = useContext(AuthenContext);
  if (!context) {
    throw new Error("useAuthenContext must be used within an AuthenProvider");
  }
  const { user, logout } = context;

  const navItems = [
    {name: 'Check-in', href: '/dashboard', icon: <CalendarMonthRoundedIcon/>},
    {name: 'Dashboard', href: '/dashboard', icon: <AssessmentIcon/>},
    {name: 'Users', href: '/users', icon: <SupervisedUserCircleIcon/>}, //check in cho khach hang
    {name: 'Services', href: '/services', icon: <RoomServiceIcon/>},
    {name: 'Booking Requests', href: '/requests', icon: <LibraryBooksIcon/>},
    {name: 'PODs / WorkRooms', href: '/rooms', icon: <ComputerIcon/>},
    {name: 'Areas', href: '/areas', icon: <RoomIcon/>},
    {name: 'Feedbacks & Reports', href: '/feedbacks&reports', icon: <InsertCommentIcon/>},
    {name: 'Membership', href: '/membership', icon: <AccountBoxIcon/>},
  ]

  const navigate = useNavigate();

  const [ isSelected, setIsSelected ] = useState(0)

  const selected = (index: number) : void => {
    setIsSelected(index)
  }

  const AdHeader:React.FC = () => {
    return (
      <div className="ad-header">
        <div className="logo"> 
          <p>WorkChill</p> 
        </div>
        <div className="user">
          <div>
            <AccountCircleIcon sx={{fontSize: 28}}/>
            <p>{user? user.email : "User"}</p>
          </div>
          <div onClick={() => {logout(); window.location.reload();}}>
            <LogoutIcon/>
            <p>Log Out</p>
          </div>
        </div>
      </div>
    )
  }

  const SideNav:React.FC = () => {
    return (
      <div className='nav-container'>
        {navItems.map((navItem, index) =>
          <div 
            key={index} 
            className={`item${index + 1}`} 
            onClick={() => {navigate(`${navItem.href}`), selected(index)}}
            style={isSelected === index ? {color: "black"} : {color: "gray"}}
            >{navItem.icon} <p>{navItem.name}</p></div>
        )}
      </div>
    )
  }

  return (
    <div id='ad-layout'>
      <AdHeader />
      <div className="content">
        <div className='sidebar'>
          <SideNav/>
        </div>
        <div className='main-content'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout