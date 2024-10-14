// import React, { createContext, ReactNode, useEffect, useState } from "react";
// import { ApiGateway } from "../Api/ApiGateway";
// import { ChildCare } from "@mui/icons-material";

// interface AuthenContextProps {
//     user: any;
//     login: (email: string, password: string) => Promise<void>;
//     logout: () => void;
// }

// interface loginResponse {
//     token: string;
// }

// export const AuthenContext = createContext<AuthenContextProps | undefined>(undefined);

// const AuthenProvider = ({ children }: { children: ReactNode }) => {
//     const [user, setUser] = useState<any>(null);

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         console.log(token)
//         if (token != null) {
//             checkTokenToLogin(token)
//         }
//     }, [])


//     const checkTokenToLogin = async (token: string): Promise<void> => {
//         if (token != null) {
//             const userdata = await ApiGateway.GetUserByToken<any>(token);
//             console.log(userdata)
//             setUser(userdata);
//         }
//     };

//     const login = async (email: string, password: string): Promise<void> => {
//         try {
//             const loginData = await ApiGateway.LoginDefault<loginResponse>(email, password);
//             localStorage.setItem('token', loginData.token);
//         } catch (error) {
//             alert("Đăng nhập thất bại")
//         }
//     }

//     const logout = () => {
//         localStorage.removeItem('token');
//     }

//     return (
//         <AuthenContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthenContext.Provider>
//     );
// }

// export default AuthenProvider;
import React, { createContext, ReactNode, useEffect, useState } from "react";

// Định nghĩa kiểu cho User
interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthenContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthenContext = createContext<AuthenContextProps | undefined>(undefined);

const AuthenProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Kiểm tra và lấy dữ liệu người dùng từ localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Cập nhật user từ localStorage
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // Giả lập thông tin người dùng
    const fakeUser: User = {
      id: 1,
      name: "user2",
      email: "fpt@gmail.com",
    };

    // Giả lập việc đăng nhập thành công và lưu vào localStorage
    localStorage.setItem("token", "fake-token-12345");
    localStorage.setItem("user", JSON.stringify(fakeUser));
    setUser(fakeUser); // Cập nhật trạng thái user
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); // Cập nhật trạng thái user về null
  };

  return (
    <AuthenContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthenContext.Provider>
  );
};

export default AuthenProvider;
