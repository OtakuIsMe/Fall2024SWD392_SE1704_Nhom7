import axios, { AxiosInstance, AxiosResponse } from "axios";

export class ApiGateway {
    public static readonly API_Base: string = 'http://localhost:5101/';
    private static axiosInstance: AxiosInstance = axios.create({
        baseURL: ApiGateway.API_Base,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    public static async LoginDefault<T>(email: string, password: string): Promise<T> {
        try {
            const data = {
                Email: email,
                Password: password
            };
            const response = await this.axiosInstance.post<T>("user/LoginDefault", data);
            return response.data;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    }

    public static async GetUserByToken<T>(token: string): Promise<T> {
        try {
            const data = {
                token: token
            }
            const response = await this.axiosInstance.post<T>("user/GetUserByToken", data);
            return response.data;
        } catch (error) {
            console.error("GetUserByToken error:", error);
            throw error;
        }
    }

    public static async GetRoomDetail<T>(hashCode: string): Promise<T> {
        try {
            const response = await this.axiosInstance.get<T>(`room/ViewDetail/${hashCode}`);
            console.log(response.data);
            return response.data
        } catch (error) {
            console.error("GetRoomDetail error:", error);
            throw error;
        }
    }
}