import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPopup from "../LoginPopup/LoginPopup";
import RegisterPopup from "../RegisterPopup/RegisterPopup";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CSSRulePlugin } from 'gsap/CSSRulePlugin';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Header.css';
import { AuthenContext } from '../AuthenContext';

interface HeaderProps {
  isTransparent: boolean;
}

gsap.registerPlugin(ScrollTrigger, CSSRulePlugin);

const Header: React.FC<HeaderProps> = ({ isTransparent }) => {
  const navigate = useNavigate();
  
  const navbar = [
    { name: 'Home', link: '/' },
    { name: 'Location', link: '/areas' },
    { name: 'Room', link: '/rooms' },
    { name: 'About us', link: '/aboutUs' },
    { name: 'Membership', link: '/membership' },
  ];

  const divRef1 = useRef<HTMLDivElement | null>(null);
  const divRef2 = useRef<HTMLDivElement | null>(null);

  const beforeRule = CSSRulePlugin.getRule(".button::before");

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const context = useContext(AuthenContext);
  if (!context) {
    throw new Error("useAuthenContext must be used within an AuthenProvider");
  }
  
  const { user, logout } = context;

  // Mở popup đăng nhập
  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };

  // Mở popup đăng ký
  const handleRegisterClick = () => {
    setIsRegisterOpen(true);
  };

  // Xử lý đăng xuất
  const handleLogoutClick = () => {
    logout();
    setAnchorEl(null);
    navigate('/'); // Điều hướng về trang chủ sau khi đăng xuất
  };

  // Hiển thị menu với nút đăng xuất
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Đóng menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Đóng popup đăng nhập/đăng ký
  const closePopup = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  // Animation của GSAP
  useEffect(() => {
    if (divRef1.current) {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: divRef1.current,
          start: 'top top',
          end: '+=200',
          scrub: true,
          pin: true, // Ghim phần tử khi scroll
          anticipatePin: 1,
        },
      });

      // Thêm các hiệu ứng chuyển động
      timeline.from(divRef1.current, {
        opacity: 0,
        y: -50,
        duration: 1,
      }).to(divRef1.current, {
        opacity: 1,
        y: 0,
        duration: 1,
      });
    }

    if (divRef2.current) {
      gsap.fromTo(
        divRef2.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: divRef2.current,
            start: 'top 80%',
            end: 'top 60%',
            scrub: true,
          },
        }
      );
    }
  }, [isTransparent]);

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
            {/* Hiển thị nút người dùng và nút đăng xuất */}
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
            {/* Hiển thị nút đăng nhập và đăng ký nếu chưa đăng nhập */}
            <Button className="login button" onClick={handleLoginClick}>
              Đăng nhập
            </Button>
            <Button className="register button" onClick={handleRegisterClick}>
              Đăng ký
            </Button>
          </>
        )}
      </div>
      {isLoginOpen && <LoginPopup onClose={closePopup} />}
      {isRegisterOpen && <RegisterPopup onClose={closePopup} />}
    </div>
  );
};

export default Header;
