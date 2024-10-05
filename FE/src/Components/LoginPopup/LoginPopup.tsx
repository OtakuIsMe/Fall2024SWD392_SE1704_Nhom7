// import React, { useState } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// interface LoginPopupProps {
//   onClose: () => void;
// }

// const LoginPopup: React.FC<LoginPopupProps> = ({ onClose }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
//     e.preventDefault();
//     try {
//       // Gửi thông tin đăng nhập tới server
//       const loginResponse = await fetch('/user/LoginDefault', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password })
//       });

//       const loginData = await loginResponse.json();
//       if (!loginResponse.ok) throw new Error(loginData.message || 'Đăng nhập thất bại');

//       // Lưu token vào localStorage
//       localStorage.setItem('token', loginData.token);

//       // Gọi API để lấy thông tin người dùng
//       const userResponse = await fetch('/user/GetUserByToken', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${loginData.token}`
//         }
//       });

//       const userData = await userResponse.json();
//       if (!userResponse.ok) throw new Error(userData.message || 'Lỗi lấy thông tin người dùng');

//       // Lưu thông tin người dùng và đóng modal
//       localStorage.setItem('user', JSON.stringify(userData));
//       onClose(); // Đóng popup
//       navigate('/'); // Điều hướng về trang chủ

//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <Dialog open onClose={onClose} aria-labelledby="form-dialog-title">
//       <form onSubmit={handleSubmit}>
//         <DialogTitle id="form-dialog-title">Đăng nhập</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="email"
//             label="Email"
//             type="email"
//             fullWidth
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <TextField
//             margin="dense"
//             id="password"
//             label="Mật khẩu"
//             type="password"
//             fullWidth
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={onClose} color="primary">
//             Hủy
//           </Button>
//           <Button type="submit" color="primary">
//             Đăng nhập
//           </Button>
//         </DialogActions>
//       </form>
//     </Dialog>
//   );
// };

// export default LoginPopup;
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface LoginPopupProps {
  onClose: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    // Giả lập dữ liệu người dùng như được trả về từ API
    const fakeUserResponse = {
      token: 'fake-token-12345', // Token giả
      userData: {
        id: 1,
        name: 'John Doe',
        email: 'fpt@gmail.com'
      }
    };

    // Điều kiện giả lập để kiểm tra email và mật khẩu
    if (email === 'fpt@gmail.com' && password === '123') {
      console.log("Đăng nhập thành công");
      localStorage.setItem('token', fakeUserResponse.token); // Lưu token vào localStorage
      localStorage.setItem('user', JSON.stringify(fakeUserResponse.userData)); // Lưu thông tin người dùng

      onClose(); // Đóng popup
      navigate('/'); // Điều hướng về trang chủ
    } else {
      alert('Thông tin đăng nhập không chính xác');
    }
  };

  return (
    <Dialog open onClose={onClose} aria-labelledby="form-dialog-title">
      <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">Đăng nhập</DialogTitle>
        <DialogContent>
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
            id="password"
            label="Mật khẩu"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Hủy
          </Button>
          <Button type="submit" color="primary">
            Đăng nhập
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default LoginPopup;
