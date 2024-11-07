import React, { useState, useContext } from 'react';
import { AuthenContext } from '../../../../Components/AuthenContext';
import { TextField, Button } from '@mui/material';
import Sidebar from '../../../../Components/Sidebar/Sidebar'; // Thêm Sidebar để đồng nhất giao diện
import './ResetPassword.css';

const ResetPassword = () => {
  const context = useContext(AuthenContext);
  if (!context) {
    throw new Error("AuthenContext must be used within an AuthenProvider");
  }

  const { resetPassword } = context;

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('Mật khẩu mới và mật khẩu xác nhận không khớp');
      return;
    }

    try {
      await resetPassword(oldPassword, newPassword);
      alert('Đổi mật khẩu thành công');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Lỗi khi đổi mật khẩu:', error);
      alert('Đổi mật khẩu thất bại');
    }
  };

  return (
    <div className="profile-container">
      <Sidebar /> {/* Thêm Sidebar để đồng nhất giao diện */}
      <div className="reset-password-content">
        <h2>Đổi mật khẩu</h2>
        <form onSubmit={handleSubmit} className="reset-password-form">
          <TextField
            margin="dense"
            id="oldPassword"
            label="Mật khẩu cũ"
            type="password"
            fullWidth
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            id="newPassword"
            label="Mật khẩu mới"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            id="confirmPassword"
            label="Xác nhận mật khẩu mới"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button type="submit" color="primary" variant="contained" className="reset-password-btn">
            Đổi mật khẩu
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
