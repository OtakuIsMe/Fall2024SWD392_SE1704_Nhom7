import { ThirtyFpsSelect } from "@mui/icons-material";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export class ApiGateway {
    public static readonly API_Base: string = 'http://localhost:5101/';
    private static axiosInstance: AxiosInstance = axios.create({
        baseURL: ApiGateway.API_Base,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    public static async ViewProfile<T>(userData: any): Promise<T> {
    try {
        const response = await this.axiosInstance.post<T>("user/ViewProfile", userData, {
            headers: { 'Content-Type': 'application/json' } // Đảm bảo request là JSON
        });
        return response.data;
    } catch (error) {
        console.error("ViewProfile error:", error);
        throw error;
    }
}

    
public static async GetTransactionHistory<T>(userId: string): Promise<T[]> {
    try {
        const response = await this.axiosInstance.get<T[]>(`transaction/History/${userId}`);
        return response.data;
    } catch (error) {
        console.error("GetTransactionHistory error:", error);
        throw error;
    }
}
    

    public static async UpdateUserProfile<T>(userData: any): Promise<T> {
        try {
            // Nếu userData là FormData, thì không đặt Content-Type
            const headers = userData instanceof FormData ? {} : { 'Content-Type': 'application/json' };
            const response = await this.axiosInstance.post<T>("user/UpdateUserProfile", userData, { headers });
            return response.data;
        } catch (error) {
            console.error("UpdateUserProfile error:", error);
            throw error;
        }
    }


    
    
    
    
    public static async GetServices<T>(): Promise<T[]> {
        try {
            const response = await this.axiosInstance.get<T[]>("http://localhost:5101/amenityservice/GetAll")
            return response.data
        } catch (error) {
            console.error("Get Services error:", error);
            throw error;
        }
    }

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
    }public static async Register<T>(email: string, password: string,username:string, phone: string): Promise<T> {
        try {
            const data = {
                Email: email,
                Password: password,
                Username: username,
                phone: phone

            };
            const response = await this.axiosInstance.post<T>("user/Register", data);
            return response.data;
        } catch (error) {
            console.error("Register error:", error);
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

    public static async GetRoomList<T>(areaId: string = '', typeRoom: string = '', startDate: string = '', endDate: string = '' ): Promise<T[]> {
        try {
            let fetchLink = 'room/GetRoomListWithBookingTimes?';
            const params: string[] = [];

            if (areaId) {
                params.push(`areaId=${encodeURIComponent(areaId)}`);
            }
            if (typeRoom) {
                params.push(`typeRoom=${encodeURIComponent(typeRoom)}`);
            }
            if (startDate) {
                params.push(`startDate=${encodeURIComponent(startDate)}`);
            }
            if (endDate) {
                params.push(`endDate=${encodeURIComponent(endDate)}`);
            }

            fetchLink += params.join('&');
            console.log(fetchLink);

            const response = await this.axiosInstance.get<T[]>(fetchLink);
            return response.data
        } catch (error) {
            console.error("GetRoomList error:", error);
            throw error;
        }
    }

    public static async GetRoomDetail<T>(hashCode: string): Promise<T> {
        try {
            const response = await this.axiosInstance.get<T>(`room/${hashCode}`);
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

            console.log(bookingData)
    
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

    public static async GetArea<T>(): Promise<T[]> {
        try {
            const response = await this.axiosInstance.get<T[]>(`area/ViewListArea`)
            return response.data
        } catch (error) {
            console.log("Get Area error: ", error)
            throw error;
        }
    }

    public static async GetRequest<T>(): Promise<T[]> {
        try {
            const response = await this.axiosInstance.get<T[]>(`booking/GetBookingRequests`)
            return response.data
        } catch (error) {
            console.log("Get Request Error: ", error)
            throw error
        }
    }
}