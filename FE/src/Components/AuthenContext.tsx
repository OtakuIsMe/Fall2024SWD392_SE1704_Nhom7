import React, { createContext, ReactNode, useEffect, useState } from "react";
import { ApiGateway } from "../Api/ApiGateway";
import { useNavigate } from "react-router";
import LoadingComp from "./LoadingComp/LoadingComp";

interface AuthenContextProps {
    user: any;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, username: string, phone: string, password: string) =>Promise<void>;
    logout: () => void;
    
    fetchUser:()=> Promise<void>;
}

interface loginResponse {
    token: string;
}

export const AuthenContext = createContext<AuthenContextProps | undefined>(undefined);

const AuthenProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<any>(true);

    useEffect(() => {
            const fetchUser = async () : Promise<void> =>{
                const token = localStorage.getItem('token');
                if (token) {
                try{
                    const response = await ApiGateway.GetUserByToken<any>(token);
                    setUser(response);
                    console.log(response)
                } catch (err){
                    console.error(err);
                } finally {
                    setIsLoading(false)
                }
            } else {
                setIsLoading(false)
            }
            }
            fetchUser();
    }, [])



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

    const fetchUser = async()=>{
        const token = localStorage.getItem('token');
                if (token) {
                try{
                    const response = await ApiGateway.GetUserByToken<any>(token);
                    setUser(response);
                    console.log(response);
                } catch (err){
                    console.error(err);
                }
            }
    }

    return (
        <AuthenContext.Provider value={{ user, login, register, logout , fetchUser}}>
            {isLoading ? <LoadingComp/> : children}
        </AuthenContext.Provider>
    );
}

export default AuthenProvider;