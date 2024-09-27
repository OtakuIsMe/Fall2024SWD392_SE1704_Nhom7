import React, { useState } from 'react';
import "./RegisterPopup.css"

const RegisterPopup = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration submitted', { email, password, confirmPassword });
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Đăng ký</h2>
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Đăng ký</button>
        </form>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default RegisterPopup;