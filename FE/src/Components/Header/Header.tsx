import React, { useState, useEffect, useRef } from 'react';
import LoginPopup from "../LoginPopup/LoginPopup";
import RegisterPopup from "../RegisterPopup/RegisterPopup";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CSSRulePlugin } from 'gsap/CSSRulePlugin';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Header.css';

gsap.registerPlugin(ScrollTrigger, CSSRulePlugin);

const Header: React.FC = () => {
  const divRef1 = useRef<HTMLDivElement | null>(null);
  const divRef2 = useRef<HTMLDivElement | null>(null);
  const beforeRule = CSSRulePlugin.getRule(".button::before");

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };

  const handleRegisterClick = () => {
    setIsRegisterOpen(true);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('user');
    setUser(null);
    setAnchorEl(null);
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
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Existing GSAP animations setup
    if (divRef1.current) {
      gsap.to(divRef1.current, { /* GSAP animation config remains unchanged */ });
      if (divRef2.current) {
        const childElements = divRef2.current.querySelectorAll('.button');
        gsap.to(childElements, { /* GSAP animation config remains unchanged */ });
        gsap.to(beforeRule, { /* GSAP animation config remains unchanged */ });
        childElements.forEach((child) => {
          child.addEventListener('mouseenter', () => {
            gsap.to(child, { color: 'white' });
            gsap.to(beforeRule, { width: '100%' });
          });
        });
      }
    }
  }, []);

  return (
    <div id="header" ref={divRef1}>
      <div className="logo">WorkChill</div>
      <ul className="list">
        <li>Trang chủ</li>
        <li>Địa điểm</li>
        <li>Phòng</li>
        <li>Về Chúng Tôi</li>
        <li>Gói Thành Viên</li>
      </ul>
      <div ref={divRef2} className="account">
        {user ? (
          <>
            <IconButton onClick={handleMenu} color="inherit">
              <AccountCircleIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>{user.name}</MenuItem>
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
      {isLoginOpen && <LoginPopup onClose={closePopup} />}
      {isRegisterOpen && <RegisterPopup onClose={closePopup} />}
    </div>
  );
};

export default Header;
