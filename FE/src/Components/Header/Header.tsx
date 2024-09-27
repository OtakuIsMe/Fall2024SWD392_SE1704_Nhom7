import React, { useState } from 'react';
import LoginPopup from '../LoginPopup/LoginPopup';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import './Header.css'

const Header = () => {
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

  return (
    <div id="header">
      <div className="logo">WorkChill</div>
      <ul className="list">
        <li>Trang chủ</li>
        <li>Địa điểm</li>
        <li>Phòng</li>
        <li>Về Chúng Tôi</li>
        <li>Gói Thành Viên</li>
      </ul>
      <div className="account">
        <button className="login" onClick={handleLoginClick}>Log in</button>
        <button className="register" onClick={handleRegisterClick}>Register</button>
      </div>
      {isLoginOpen && <LoginPopup onClose={closePopup} />}
      {isRegisterOpen && <RegisterPopup onClose={closePopup} />}
    </div>
  );
};

export default Header;