import React, { createContext, ReactNode, useEffect, useState } from "react";
import { ApiGateway } from "../Api/ApiGateway";
import { useNavigate } from "react-router";
import LoadingComp from "./LoadingComp/LoadingComp";

interface AuthenContextProps {
    user: any;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, username: string, phone: string, password: string) => Promise<void>;
    logout: () => void;
    
   
}

interface loginResponse {
    token: string;
}

export const AuthenContext = createContext<AuthenContextProps | undefined>(undefined);

const AuthenProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [favoriteRooms, setFavoriteRooms] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Fetch user by token
    const fetchUserByToken = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await ApiGateway.GetUserByToken<any>(token);
                setUser(response);
            } catch (error) {
                console.error("Error fetching user by token:", error);
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserByToken();
    }, []);

    const login = async (email: string, password: string): Promise<void> => {
        try {
            const loginData = await ApiGateway.LoginDefault<loginResponse>(email, password);
            localStorage.setItem('token', loginData.token);
            await fetchUserByToken();
        } catch (error) {
            alert("Login failed");
        }
    };

    const register = async (email: string, username: string, phone: string, password: string): Promise<void> => {
        try {
            await ApiGateway.Register(email, username, phone, password);
            alert("Registration successful");
        } catch (error) {
            console.error("Registration failed", error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setFavoriteRooms([]); // Reset danh sách yêu thích khi đăng xuất
    };

    

   

    // Lấy danh sách phòng yêu thích của người dùng


    return (
        <AuthenContext.Provider value={{
            user,
            favoriteRooms,
            login,
            register,
            logout,
            
            
        }}>
            {isLoading ? <LoadingComp /> : children}
        </AuthenContext.Provider>
    );
};

export default AuthenProvider;
