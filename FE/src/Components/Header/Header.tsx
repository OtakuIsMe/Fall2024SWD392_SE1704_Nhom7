import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPopup from "../LoginPopup/LoginPopup";
import RegisterPopup from "../RegisterPopup/RegisterPopup";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CSSRulePlugin } from 'gsap/CSSRulePlugin';
import { Button, IconButton, Menu, MenuItem, Box, Modal, Typography, TextField, Badge } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './Header.css';
import { AuthenContext } from '../AuthenContext';

// Define the props type
interface HeaderProps {
  isTransparent: boolean;
}

gsap.registerPlugin(ScrollTrigger, CSSRulePlugin);

const Header: React.FC<HeaderProps> = ({ isTransparent }) => {
  const navigate = useNavigate();

  const navbar = [
    { name: 'Home', link: '/' },
    { name: 'Location', link: '/areas' },
    { name: 'Room', link: '/roomlist' },
    { name: 'About us', link: '/aboutUs' },
    { name: 'Membership', link: '/membership' },
  ];

  const divRef1 = useRef<HTMLDivElement | null>(null);
  const divRef2 = useRef<HTMLDivElement | null>(null);

  const beforeRule = CSSRulePlugin.getRule(".button::before");

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const context = useContext(AuthenContext);

  if (!context) {
    throw new Error("useAuthenContext must be used within an AuthenProvider");
  }

  const { user, logout } = context;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };

  const handleRegisterClick = () => {
    setIsRegisterOpen(true);
  };

  const handleLogoutClick = () => {
    logout();
    setAnchorEl(null);
    window.location.href = '/';
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const closePopup = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  const handleEditClick = () => {
    setIsEditOpen(true);
    setAnchorEl(null); // Đóng menu khi mở modal chỉnh sửa
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  useEffect(() => {
    if (divRef1.current) {
      if (isTransparent) {
        gsap.to(
          divRef1.current,
          {
            padding: '20px 0',
            backgroundColor: 'white',
            color: 'black',
            boxShadow: '5px 0 25px #ccc',
            scrollTrigger: {
              trigger: divRef1.current,
              start: 'bottom -0%',
              end: 'bottom -10%',
              toggleActions: 'play none none reverse',
              scrub: true,
            },
          }
        );
        if (divRef2.current) {
          const childElements = divRef2.current.querySelectorAll('.button');
          gsap.to(childElements, {
            border: 'black',
            color: 'black',
            scrollTrigger: {
              trigger: divRef1.current,
              start: 'bottom -0%',
              end: 'bottom -10%',
              toggleActions: 'play none none reverse',
              scrub: true,
            },
          });

          gsap.to(beforeRule, {
            backgroundColor: 'black',
            scrollTrigger: {
              trigger: divRef1.current,
              start: 'bottom -0%',
              end: 'bottom -10%',
              toggleActions: 'play none none reverse',
              scrub: true,
            },
          });
        }
      }
    }
  }, []);

  return (
    <div id="header" ref={divRef1}>
      <div className="logo">WorkChill</div>
      <ul className="list">
        {navbar.map((nav, index) => (
          <li key={index} onClick={() => navigate(`${nav.link}`)}>{nav.name}</li>
        ))}
      </ul>
      <div ref={divRef2} className="account">
        {user ? (
          <>
            {/* Biểu tượng thông báo */}
            <IconButton color="inherit">
              <Badge badgeContent={user?.notifications} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* Biểu tượng tài khoản */}
            <IconButton onClick={handleMenu} color="inherit">
              <AccountCircleIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleClose}>{user.username}</MenuItem>
              <MenuItem onClick={handleEditClick}>Chỉnh sửa thông tin</MenuItem>
              <MenuItem onClick={() => navigate('/transaction-history')}>Lịch sử giao dịch</MenuItem>
              <MenuItem onClick={handleLogoutClick}>Đăng xuất</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button className="login button" onClick={handleLoginClick}>Log in</Button>
            <Button className="register button" onClick={handleRegisterClick}>Register</Button>
          </>
        )}
      </div>

      {/* Modal chỉnh sửa thông tin cá nhân */}
      <Modal open={isEditOpen} onClose={handleEditClose}>
        <Box sx={{ ...modalStyle }}>
          <Typography variant="h6">Chỉnh sửa thông tin cá nhân</Typography>
          <TextField label="Tên" defaultValue={user?.name} fullWidth margin="normal" />
          <TextField label="Tên đăng nhập" defaultValue={user?.username} fullWidth margin="normal" />
          <TextField label="Email" defaultValue={user?.email} type="email" fullWidth margin="normal" />
          <TextField label="Số điện thoại" defaultValue={user?.phone} type="tel" fullWidth margin="normal" />

          <Typography variant="h6">Thay đổi mật khẩu</Typography>
          <TextField label="Mật khẩu hiện tại" type="password" fullWidth margin="normal" />
          <TextField label="Mật khẩu mới" type="password" fullWidth margin="normal" />

          <Button onClick={handleEditClose}>Đóng</Button>
          <Button variant="contained" onClick={() => {/* handle save changes */}}>Lưu thay đổi</Button>
        </Box>
      </Modal>

      {isLoginOpen && <LoginPopup onClose={closePopup} />}
      {isRegisterOpen && <RegisterPopup onClose={closePopup} />}
    </div>
  );
};

// Styling cho Modal
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default Header;
