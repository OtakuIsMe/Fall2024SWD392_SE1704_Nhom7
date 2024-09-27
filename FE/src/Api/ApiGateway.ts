import axios, { AxiosInstance, AxiosResponse } from "axios";

export class ApiGateway {
    public static readonly API_Base: string = 'http://localhost:5101/';
    private static axiosInstance: AxiosInstance = axios.create({
        baseURL: ApiGateway.API_Base,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    public static async LoginDefault<T>(email: string, password: string): Promise<AxiosResponse<T>> {
        try {
            const data = {
                Email: email,
                Password: password
            };
            const response = await this.axiosInstance.post<T>("user/LoginDefault", data);
            return response;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    }
}