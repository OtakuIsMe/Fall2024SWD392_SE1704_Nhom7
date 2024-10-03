import React, { useState } from 'react';
import { Button, TextField, Checkbox, FormControlLabel, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close'; // Sử dụng icon đóng từ Material-UI

interface LoginPopupProps {
  onClose: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Dữ liệu ảo cho người dùng
  const users = [
    { email: "fpt@gmail.com", password: "123" }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {  // Thêm kiểu vào sự kiện
    e.preventDefault();
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      console.log("Đăng nhập thành công");
      localStorage.setItem('user', JSON.stringify(user));  // Lưu thông tin người dùng
      navigate('/user');
      onClose();
    } else {
      console.log("Thông tin đăng nhập không chính xác");
      alert("Thông tin đăng nhập không chính xác");  // Thông báo cho người dùng
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle style={{ textAlign: "center", fontSize: "58px" }}>
        Đăng nhập
        <Button onClick={onClose} style={{ position: 'absolute', right: '10px', top: '10px', border: 'none', color: 'gray' }}>
          <CloseIcon />
        </Button>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="E-mail"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Mật khẩu"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Nhớ đăng nhập"
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary" style={{ margin: "auto" }}>Đăng nhập</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default LoginPopup;
