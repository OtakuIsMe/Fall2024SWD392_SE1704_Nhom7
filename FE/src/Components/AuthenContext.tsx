import React, { createContext, ReactNode, useEffect, useState } from "react";
import { ApiGateway } from "../Api/ApiGateway";

interface AuthenContextProps {
    user: any;
    roleId: any;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, username: string, phone: string, password: string) =>Promise<void>;
    logout: () => void;
}

interface loginResponse {
    token: string;
}

export const AuthenContext = createContext<AuthenContextProps | undefined>(undefined);

const AuthenProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [roleId, setRoleId] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token)
        if (token != null) {
            checkTokenToLogin(token)
        }
    }, [])


    const checkTokenToLogin = async (token: string): Promise<void> => {
        if (token != null) {
            const userdata = await ApiGateway.GetUserByToken<any>(token);
            console.log(userdata)
            setUser(userdata);
            setRoleId(userdata.roleId);
        }
    };

    const login = async (email: string, password: string): Promise<void> => {
        try {
            const loginData = await ApiGateway.LoginDefault<loginResponse>(email, password);
            localStorage.setItem('token', loginData.token);
        } catch (error) {
            alert("Đăng nhập thất bại")
        }
    }
    const register = async (email: string, username: string, phone: string, password: string): Promise<void> => {
  try {
    // Giả sử hàm ApiGateway.Register yêu cầu từng tham số riêng lẻ
    await ApiGateway.Register(email, username, phone, password); // Truyền đủ 4 tham số
    alert("Đăng ký thành công");
  } catch (error) {
    throw new Error("Đăng ký thất bại");
  }
};

      
    const logout = () => {
        localStorage.removeItem('token');
    }

    return (
        <AuthenContext.Provider value={{ user, roleId, login,register, logout }}>
            {children}
        </AuthenContext.Provider>
    );
}

export default AuthenProvider;