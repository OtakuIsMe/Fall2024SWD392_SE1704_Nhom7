import React, { useContext, useState, useEffect } from 'react';
import { DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { AuthenContext } from '../../Components/AuthenContext';
import { Navigate, useNavigate } from 'react-router';
import './Login.css'
import { Token } from '@mui/icons-material';

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const context = useContext(AuthenContext);

    if (!context) {
        throw new Error("useAuthenContext must be used within an AuthenProvider");
    }

    const { login, user, fetchUser } = context;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        await login(email, password);
        await fetchUser();
    };

    useEffect(()=> {
        console.log(user);
        if (user) {
            try{
                let last_href = sessionStorage.getItem('last_href');
                if( user.roleId === '6489cb2a-f4df-4020-bf31-56f2a19d30c3'){
                    navigate('/dashboard')
                } else if(user.roleId === '42feaeb5-fc53-4163-98b5-d28cfceafa7c'){
                    navigate('/dashboard')
                } else if (user.roleId === '5a4226d9-e58a-42c4-a786-dba8369b234b') {
                    navigate('/check-in')
                } else if (last_href) {
                    window.location.href = last_href;
                    sessionStorage.removeItem('last_href');
                } else {
                    navigate('/')
                }
            } catch (e) {
                console.log(e)
            }
        }
    },[login, user])

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
                        id="password"
                        label="Mật khẩu"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='login-btns'>
                    <button type="submit" color="primary">
                        Đăng nhập
                    </button>
                    <div onClick={() => navigate("/")} color="primary">
                        Hủy
                    </div>
                </div>
            </form>
        </div>
    );
};