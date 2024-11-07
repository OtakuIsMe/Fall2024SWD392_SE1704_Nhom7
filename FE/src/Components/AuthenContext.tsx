import React, { createContext, ReactNode, useEffect, useState } from "react";
import { ApiGateway } from "../Api/ApiGateway";
import { useNavigate } from "react-router";
import LoadingComp from "./LoadingComp/LoadingComp";

interface AuthenContextProps {
    user: any;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, username: string, phone: string, password: string) => Promise<void>;
    logout: () => void;
    fetchUser: () => Promise<void>;
    resetPassword: (oldPassword: string, newPassword: string) => Promise<void>;
}

interface loginResponse {
    token: string;
}

export const AuthenContext = createContext<AuthenContextProps | undefined>(undefined);

const AuthenProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<any>(true);

    useEffect(() => {
        const fetchUser = async (): Promise<void> => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await ApiGateway.GetUserByToken<any>(token);
                    setUser(response);
                    console.log(response);
                } catch (err) {
                    console.error(err);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, []);

    const login = async (email: string, password: string): Promise<void> => {
        try {
            const loginData = await ApiGateway.LoginDefault<loginResponse>(email, password);
            localStorage.setItem('token', loginData.token);
            await fetchUser(); // Cập nhật user sau khi đăng nhập
        } catch (error) {
            alert("Đăng nhập thất bại");
        }
    };

    const register = async (email: string, username: string, phone: string, password: string): Promise<void> => {
        try {
            await ApiGateway.Register(email, username, phone, password);
            alert("Đăng ký thành công");
        } catch (error) {
            throw new Error("Đăng ký thất bại");
        }
    };

    const resetPassword = async (oldPassword: string, newPassword: string): Promise<void> => {
        if (!user) {
            alert('Không thể xác định người dùng. Vui lòng đăng nhập lại.');
            return;
        }
        try {
            await ApiGateway.ResetPassword(user.id, oldPassword, newPassword);
            alert('Reset password thành công');
        } catch (error) {
            alert('Reset password thất bại');
            console.error('Reset password error:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await ApiGateway.GetUserByToken<any>(token);
                setUser(response);
                console.log(response);
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <AuthenContext.Provider value={{ user, login, register, logout, fetchUser, resetPassword }}>
            {isLoading ? <LoadingComp /> : children}
        </AuthenContext.Provider>
    );
};

export default AuthenProvider;
