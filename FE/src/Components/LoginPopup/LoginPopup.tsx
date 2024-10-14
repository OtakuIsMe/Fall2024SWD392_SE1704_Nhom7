// import React, { useContext, useState } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { AuthenContext } from '../AuthenContext';
// import { ApiGateway } from '../../Api/ApiGateway';

// interface LoginPopupProps {
//   onClose: () => void;
// }


// const LoginPopup: React.FC<LoginPopupProps> = ({ onClose }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();
//   const context = useContext(AuthenContext);
//   if (!context) {
//     throw new Error("useAuthenContext must be used within an AuthenProvider");
//   }
//   const { login } = context;
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
//     e.preventDefault();
//     login(email, password);
//     onClose();
//     navigate('/');
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

// // export default LoginPopup;
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface LoginPopupProps {
  onClose: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Kiểm tra email và mật khẩu có được nhập hay không
    if (!email || !password) {
      setErrorMessage('Vui lòng nhập đầy đủ email và mật khẩu.');
      return;
    }

    // Giả lập dữ liệu người dùng như được trả về từ API
    const fakeUserResponse = {
      token: 'fake-token-12345', // Token giả
      userData: {
        id: 1,
        name: 'userdz',
        email: 'fpt@gmail.com'
      }
    };

    // Điều kiện giả lập để kiểm tra email và mật khẩu
    if (email === 'fpt@gmail.com' && password === '123') {
      console.log('Đăng nhập thành công');
      localStorage.setItem('token', fakeUserResponse.token); // Lưu token vào localStorage
      localStorage.setItem('user', JSON.stringify(fakeUserResponse.userData)); // Lưu thông tin người dùng

      onClose(); // Đóng popup
      navigate('/'); // Điều hướng về trang chủ
    } else {
      setErrorMessage('Thông tin đăng nhập không chính xác.');
    }
  };

  return (
    <Dialog open onClose={onClose} aria-labelledby="form-dialog-title">
      <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">Đăng nhập</DialogTitle>
        <DialogContent>
          {errorMessage && (
            <div style={{ color: 'red', marginBottom: '10px' }}>
              {errorMessage}
            </div>
          )}
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
