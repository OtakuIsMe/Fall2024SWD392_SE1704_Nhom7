import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import RegisterPopup from "../RegisterPopup/RegisterPopup";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CSSRulePlugin } from 'gsap/CSSRulePlugin';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
  ]

  const divRef1 = useRef<HTMLDivElement | null>(null);
  const divRef2 = useRef<HTMLDivElement | null>(null);

  const beforeRule = CSSRulePlugin.getRule(".button::before");

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const context = useContext(AuthenContext);
  if (!context) {
    throw new Error("useAuthenContext must be used within an AuthenProvider");
  }
  const { user, logout } = context;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleLoginClick = () => {
    navigate('/login');
  };
const handleProfileCLick = () => {
  navigate('/profile');
}
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
    setIsRegisterOpen(false);
  };

  useEffect(() => {},[user]);

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
        {navbar.map((nav, index) => (
          <li key={index} onClick={() => navigate(`${nav.link}`)}>{nav.name}</li>
        ))}
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
              <MenuItem onClick={handleClose}>{user.username}</MenuItem>
              <MenuItem onClick={handleProfileCLick}>User Profile</MenuItem>
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
      {isRegisterOpen && <RegisterPopup onClose={closePopup} />}
    </div>
  );
};

export default Header;