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
    } public static async Register<T>(email: string, password: string, username: string, phone: string): Promise<T> {
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

    public static async GetRoomList<T>(areaId: string = '', typeRoom: string = '', startDate: string = '', endDate: string = ''): Promise<T[]> {
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
            console.error("Input:", bookingId)
            throw err;
        }

    }

    public static async payBill<T>(bookingId: string): Promise<T> {
        try {
            const data = {
                bookingId
            }
            const response = await this.axiosInstance.post<T>(`transaction/Payment-PayPal-Create`, data);

            console.log(response.data);
            return response.data
        } catch (error) {
            console.error("Transaction error:", error);
            console.error("Input:", bookingId)
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

    public static async ApproveBooking<T>(bookingId: string): Promise<T> {
        try {
            const response = await this.axiosInstance.put<T>(`booking/AcceptBooking/${bookingId}`)
            return response.data
        } catch (error) {
            console.log("Accept Request Error: ", error)
            throw error
        }
    }

    public static async CancelBooking<T>(bookingId: string): Promise<T> {
        try {
            const response = await this.axiosInstance.put<T>(`booking/CancelBooking/${bookingId}`)
            return response.data
        } catch (error) {
            console.log("Accept Request Error: ", error)
            throw error
        }
    }

    public static async CreateService<T>(name: string, type: number, price: number, image: File): Promise<T> {
        try {
            const formData = new FormData();
            formData.append("Name", name);
            formData.append("Type", type.toString());
            formData.append("Price", price.toString());
            formData.append("Image", image);
            const response = await axios.post<T>(`http://localhost:5101/amenityservice/CreateService`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data
        } catch (error) {
            console.log("Create Service Error: ", error)
            throw error
        }
    }

    public static async GetMembership<T>(): Promise<T[]> {
        try {
            const response = await this.axiosInstance.get<T[]>(`membership/Get-All`)
            console.log(response.data)
            return response.data
        } catch (error) {
            console.error("Get Membership Error: ", error)
            throw error
        }
    }

    public static async GetFeedback<T>(): Promise<T[]> {
        try {
            const response = await this.axiosInstance.get<T[]>(`report/rating-feedbacks`)
            return response.data
        } catch (error) {
            console.error("Get Feedback Error: ", error)
            throw error
        }
    }

    public static async DeleteService<T>(id: string): Promise<any> {
        try {
            const response = await this.axiosInstance.delete<T>(`amenityservice/DeleteService/${id}`)
            return response.data;
        } catch (error) {
            console.error("Error Deleting Service: ", error)
        }
    }

    public static async UpdateService<T>(id: string, name: string, price: number, image: File): Promise<any> {
        try {
            const formData = new FormData();
            formData.append("Name", name);
            formData.append("Price", price.toString());
            formData.append("Image", image);
            const response = await axios.put<T>(`/amenityservice/UpdateService/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            return response.data;
        } catch (error) {
            console.error("Error Updating Service: ", error)
        }
    }
    public static async TotalUser<T>(): Promise<any> {
        try {
            const response = await this.axiosInstance.get<T>(`/user/Total`)
            return response.data;
        } catch (error) {
            console.error("Error Total: ", error)
        }
    }
    public static async TotalIncome<T>(): Promise<any> {
        try {
            const response = await this.axiosInstance.get<T>(`/transaction/Total-Income`)
            return response.data;
        } catch (error) {
            console.error("Error Total: ", error)
        }
    }
    public static async TotalBooking<T>(): Promise<any> {
        try {
            const response = await this.axiosInstance.get<T>(`/booking/TotalBooking`)
            return response.data;
        } catch (error) {
            console.error("Error Total: ", error)
        }
    }
    public static async Statistic<T>(year: number): Promise<any> {
        try {
            const response = await this.axiosInstance.get<T>(`/transaction/Statistic-Month/${year}`)
            return response.data;
        } catch (error) {
            console.error("Error Total: ", error)
        }
    }
    public static async Trending<T>(): Promise<any> {
        try {
            const response = await this.axiosInstance.get<T>(`/room/Trending`)
            return response.data;
        } catch (error) {
            console.error("Error Total: ", error)
        }
    }
    public static async ScheduleManager<T>(startDate: string, endDate: string): Promise<any> {
        try {
            const response = await this.axiosInstance.get<T>(`/booking/GetScheduleBookingForStaff?startDate=${startDate}&endDate=${endDate}`)
            return response.data;
        } catch (error) {
            console.error("Error Total: ", error)
        }
    }
    public static async CheckIn<T>(bookingId: string, isCheckIn: boolean): Promise<any> {
        try {
            const data = {
                bookingId: bookingId,
                isCheckIn: isCheckIn
            }
            const response = await this.axiosInstance.post<T>(`/booking/HandleCheckIn`, data)
            return response.data;
            return response.data;
        } catch (error) {
            console.error("Error Total: ", error)
        }
    }
    public static async ScheduleRoom<T>(startDate: string, endDate: string, roomId: any): Promise<any> {
        try {
            const response = await this.axiosInstance.get<T>(`/room/RoomSchedule?roomId=${roomId}&StartDate=${startDate}&EndDate=${endDate}`)
            return response.data;
        } catch (error) {
            console.error("Error Total: ", error)
        }
    }
}