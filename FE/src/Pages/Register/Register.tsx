import React, { useContext, useState, useEffect } from 'react';
import { DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { AuthenContext } from '../../Components/AuthenContext';
import { Navigate, useNavigate } from 'react-router';
import { ApiGateway } from '../../Api/ApiGateway';
import { Token } from '@mui/icons-material';


interface Register {
    onClose: () => void;
  }
export const Register: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const context = useContext(AuthenContext);

    if (!context) {
        throw new Error("useAuthenContext must be used within an AuthenProvider");
    }

    const { register } = context;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      if (password !== confirmPassword) {
        alert("Mật khẩu không khớp!");
        return;
      }
      
      try {
        await register(email, username, phone, password);
        
      } catch (error) {
        alert("Đăng ký thất bại, vui lòng thử lại.");
      }
    };

    return (
        <div id="login-form">
            <form onSubmit={(e) => handleSubmit(e)}>
                <h1 className="form-dialog-title">WorkChill</h1>
                <div className='login-input'>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="=Username"
                        label="Tên Đăng Nhập"
                        type="usename"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="phone"
                        label="Số điện thoại"
                        type="tel"
                        fullWidth
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />    

                    <TextField
                        margin="dense"
                        id="password"
                        label="Mật khẩu"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="confirmPassword"
                        label="Xác nhận mật khẩu"
                        type="password"
                        fullWidth
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className='login-btns'>
                    <button type="submit"  color="primary">
                        Đăng Kí
                    </button>
                    <div onClick={() => navigate("/")} color="primary">
                        Hủy
                    </div>
                </div>
            </form>
        </div>
    );
};