import React, { createContext, ReactNode, useEffect, useState } from "react";
import { ApiGateway } from "../Api/ApiGateway";

interface AuthenContextProps {
    user: any;
    roleId: any;
    login: (email: string, password: string) => Promise<void>;
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

    const logout = () => {
        localStorage.removeItem('token');
    }

    return (
        <AuthenContext.Provider value={{ user, roleId, login, logout }}>
            {children}
        </AuthenContext.Provider>
    );
}

export default AuthenProvider;