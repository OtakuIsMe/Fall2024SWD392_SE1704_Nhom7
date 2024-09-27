import React, { useState } from 'react';
import './LoginPopup.css';

const LoginPopup = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted', { email, password });
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Đăng nhập</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>
            <input type="checkbox" /> Nhớ đăng nhập
          </label>
          <button type="submit">Đăng nhập</button>
        </form>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default LoginPopup;