import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom'
import LoginPopup from "../LoginPopup/LoginPopup";
import RegisterPopup from "../RegisterPopup/RegisterPopup";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CSSRulePlugin } from 'gsap/CSSRulePlugin';
import './Header.css';

gsap.registerPlugin(ScrollTrigger, CSSRulePlugin);

const Header : React.FC = () => {
  const divRef1 = useRef<HTMLDivElement | null>(null);
  const divRef2 = useRef<HTMLDivElement | null>(null);

  const beforeRule = CSSRulePlugin.getRule(".button::before");

  // const navigate = useNavigate();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };

  const handleRegisterClick = () => {
    setIsRegisterOpen(true);
  };

  const closePopup = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  useEffect(() => {
    if (divRef1.current) {      
      gsap.to(
        divRef1.current,
        {
          padding: '20px',
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
          scrollTrigger:{
            trigger: divRef1.current,
            start: 'bottom -0%',
            end: 'bottom -10%',
            toggleActions: 'play none none reverse',
            scrub: true,
          },
        })
        gsap.to(beforeRule, {
          backgroundColor: 'black',
          scrollTrigger:{
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
        <button className="login button" onClick={handleLoginClick}>Log in</button>
        <button className="register button" onClick={handleRegisterClick}>Register</button>
      </div>
      {isLoginOpen && <LoginPopup onClose={closePopup} />}
      {isRegisterOpen && <RegisterPopup onClose={closePopup} />}
    </div>
  );
};

export default Header;