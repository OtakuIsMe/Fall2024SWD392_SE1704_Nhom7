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

    public static async GetUserList<T>(): Promise<T[]> {
        try {
            const response = await this.axiosInstance.get<T[]>(`user/GetListUserCustomer`);
            console.log(response.data);
            return response.data
        } catch (error) {
            console.error("GetUserList error:", error);
            throw error;
        }
    }

    public static async GetRoomList<T>(areaId: string, typeRoom: string, startDate: string, endDate: string ): Promise<T[]> {
        try {
            const response = await this.axiosInstance.get<T[]>(`room/GetRoomListWithBookingTimes?areaId=${areaId}&typeRoom=${typeRoom}&startDate=${startDate}&endDate=${endDate}`);
            return response.data
        } catch (error) {
            console.error("GetRoomList error:", error);
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

    public static async BookRoom<T>(userId: string, roomId: string, bookingItemDTOs: object[], timeHourBooking: number, dateBooking: string): Promise<T> {
        try {
            const bookingData = {
                roomId: roomId,
                userId: userId,
                bookingItemDTOs: bookingItemDTOs,
                timeHourBooking: timeHourBooking,
                dateBooking: dateBooking
            };
    
            const response = await this.axiosInstance.post<T>(`booking/room/`, bookingData);
    
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("BookRoom error:", error);
            throw error;
        }
    }

    public static async payCOD<T>(bookingId: string): Promise<T> {
        try {
            const bookingid = bookingId;
            const response = await this.axiosInstance.post<T>(`transaction/payment-cod`, bookingid)

            console.log(response);
            return response.data;
        } catch (err) {
            console.error("Transaction error:", err);
            console.error("Input:",bookingId)
            throw err;
        }

    }

    public static async payBill<T>(bookingId: string): Promise<T> {
        try {
            const bookingid = bookingId;
            const response = await this.axiosInstance.post<T>(`transaction/Payment-PayPal-Create`, bookingid);
            
            console.log(response.data);
            return response.data
        } catch (error) {
            console.error("Transaction error:", error);
            console.error("Input:",bookingId)
            throw error;
        }
    }
}