import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import LoginPopup from "../LoginPopup/LoginPopup";
import RegisterPopup from "../RegisterPopup/RegisterPopup";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CSSRulePlugin } from 'gsap/CSSRulePlugin';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Header.css';

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
    { name: 'Room', link: '/rooms' },
    { name: 'About us', link: '/aboutUs' },
    { name: 'Membership', link: '/membership' },
  ]

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
              toggleActions: 'play none none reverse', // Play on scroll down, reverse on scroll up
              scrub: true,          // Smooth scrubbing to match scroll progress
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
          })

          gsap.to(beforeRule, {
            backgroundColor: 'black',
            scrollTrigger: {
              trigger: divRef1.current,
              start: 'bottom -0%',
              end: 'bottom -10%',
              toggleActions: 'play none none reverse',
              scrub: true,
            },
          })

          childElements.forEach((child) => {
            // Hover animation on mouse enter
            child.addEventListener('mouseenter', () => {
              // Animate the child on hover
              gsap.to(child, {
                color: 'white',
              });

              // Animate the ::before pseudo-element on hover
              gsap.to(beforeRule, {
                width: '100%',
              });
            });
          })
        }
      } else {
        gsap.fromTo(
          divRef1.current,
          {
            padding: '20px 0',
            backgroundColor: 'white',
            color: 'black',
            boxShadow: '5px 0 25px #ccc',
            position: 'relative',
          },
          {
            padding: '20px 0',
            backgroundColor: 'white',
            color: 'black',
            boxShadow: '5px 0 25px #ccc',
            position: 'relative',
            scrollTrigger: {
              trigger: divRef1.current,
              start: 'bottom -0%',
              end: 'bottom -10%',
              toggleActions: 'play none none none', // Play on scroll down, not reverse on scroll up
              scrub: true,          // Smooth scrubbing to match scroll progress
            },
          }
        );
        if (divRef2.current) {
          const childElements = divRef2.current.querySelectorAll('.button');
          gsap.fromTo(childElements,
            {
              border: 'black',
              color: 'black',
            },
            {
              border: 'black',
              color: 'black',
              scrollTrigger: {
                trigger: divRef1.current,
                start: 'bottom -0%',
                end: 'bottom -10%',
                toggleActions: 'play none none none',
                scrub: true,
              },
            })
          gsap.fromTo(beforeRule,
            {
              backgroundColor: 'black',
            },
            {
              backgroundColor: 'black',
              scrollTrigger: {
                trigger: divRef1.current,
                start: 'bottom -0%',
                end: 'bottom -10%',
                toggleActions: 'play none none none',
                scrub: true,
              },
            })
          childElements.forEach((child) => {
            // Hover animation on mouse enter
            child.addEventListener('mouseenter', () => {
              // Animate the child on hover
              gsap.fromTo(child,
                {
                  color: 'white',
                },
                {
                  color: 'white',
                });

              // Animate the ::before pseudo-element on hover
              gsap.fromTo(beforeRule,
                {
                  width: '100%'
                },
                {
                  width: '100%',
                });
            });
          })
        }
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