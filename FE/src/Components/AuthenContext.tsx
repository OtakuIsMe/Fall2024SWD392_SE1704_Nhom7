import React, { createContext, ReactNode, useEffect, useState } from "react";
import { ApiGateway } from "../Api/ApiGateway";
import { useNavigate } from "react-router";
import LoadingComp from "./LoadingComp/LoadingComp";

interface AuthenContextProps {
    user: any;
    favoriteRooms: any[];
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, username: string, phone: string, password: string) => Promise<void>;
    logout: () => void;
    viewProfile: () => Promise<void>;
    updateUserProfile: (userData: any) => Promise<void>;
    fetchFavoriteRooms: () => Promise<any[]>;
    unfavoriteRoom: (roomId: string) => Promise<void>;
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

    const viewProfile = async (): Promise<void> => {
        if (user && user.id) {
            try {
                const response = await ApiGateway.ViewProfile<any>({ userId: user.id });
                setUser(response);
            } catch (error) {
                console.error("Lỗi khi lấy thông tin hồ sơ:", error);
            }
        }
    };

    const updateUserProfile = async (userData: any): Promise<void> => {
        try {
            const updatedUser = {
                ...userData,
                userId: user.userId || user.id,
            };
            await ApiGateway.UpdateUserProfile(updatedUser);
            setUser(updatedUser);
            alert("Profile updated successfully");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile");
        }
    };

    // Lấy danh sách phòng yêu thích của người dùng
    const fetchFavoriteRooms = async (): Promise<any[]> => {
        if (user && user.id) {
            try {
                const response = await ApiGateway.GetFavoriteRooms<any>(user.id);
                return response; // Trả về danh sách phòng yêu thích
            } catch (error) {
                console.error("Error fetching favorite rooms:", error);
                return []; // Trả về mảng rỗng nếu có lỗi
            }
        }
        return [];
    };
    
    // Thêm hoặc xóa phòng khỏi danh sách yêu thích
    const unfavoriteRoom = async (roomId: string): Promise<void> => {
        if (user && user.id) {
            try {
                await ApiGateway.UnfavoriteRoom<any>(user.id, roomId);
                const updatedFavorites = await fetchFavoriteRooms(); // Lấy lại danh sách yêu thích
                setFavoriteRooms(updatedFavorites); // Cập nhật danh sách yêu thích
            } catch (error) {
                console.error("Error unfavoriting room:", error);
            }
        }
    };

    return (
        <AuthenContext.Provider value={{
            user,
            favoriteRooms,
            login,
            register,
            logout,
            viewProfile,
            updateUserProfile,
            fetchFavoriteRooms,
            unfavoriteRoom
        }}>
            {isLoading ? <LoadingComp /> : children}
        </AuthenContext.Provider>
    );
};

export default AuthenProvider;
