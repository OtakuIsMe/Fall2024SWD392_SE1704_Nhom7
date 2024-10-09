import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="navbar">
      <Link to="/">Trang chủ</Link>
      <Link to="/dia-diem">Địa điểm</Link>
      <Link to="/phong">Phòng</Link>
      <Link to="/ve-chung-toi">Về Chúng Tôi</Link>
      {user.name ? (
        <>
          <span>{user.name}</span>
          <button onClick={() => {
            localStorage.removeItem('user');
            window.location.reload();
          }}>Log Out</button>
        </>
      ) : (
        <>
          <Link to="/login">Log In</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </div>
  );
};

export default NavBar;
