import { Password, ThirtyFpsSelect } from "@mui/icons-material";
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
    }   public static async Register<T>(email: string, username: string, phone: string, password: string): Promise<T> {
        try {
            const data = {
                email: email,
                username: username,
                phone: phone,
                password: password
            };
            console.log(data);
            const response = await this.axiosInstance.post<T>("user/Register", data);
            return response.data;
        } catch (error) {
            console.error("Register error:", error);
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
            const response = await this.axiosInstance.get<T[]>(`user/GetAllUser`);
            console.log(response.data);
            return response.data
        } catch (error) {
            console.error("GetUserList error:", error);
            throw error;
        }
    }
    public static async UpdateUserProfile<T>(userData: any): Promise<T> {
        try {
            
            const headers = userData instanceof FormData ? {} : { 'Content-Type': 'application/json' };
            const response = await this.axiosInstance.post<T>("user/UpdateUserProfile", userData, { headers });
            return response.data;
        } catch (error) {
            console.error("UpdateUserProfile error:", error);
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
    public static async CreateMembership<T>(name: string, discount: number, dayLeft: number, price: number, rank: number): Promise<T> {
        try {
            const requestBody = {
                name,
                discount,
                dayLeft,
                price,
                rank,
            };
    
            const response = await this.axiosInstance.post<T>('/membership/Create-membership', requestBody);
            return response.data;
        } catch (error) {
            console.error("Create Membership Error:", error);
            throw error;
        }
    }
    
      public static async GetMembershipDetails<T>(id: string): Promise<T> {
        try {
          const response = await this.axiosInstance.get<T>(`/membership/get-membership-details/${id}`);
          return response.data;
        } catch (error) {
          console.error("Get Membership Details Error:", error);
          throw error;
        }
      }
      public static async DeleteMembership<T>(id: string): Promise<T> {
        try {
          const response = await this.axiosInstance.delete<T>(`/membership/Delete-membership/${id}`);
          return response.data;
        } catch (error) {
          console.error("Delete Membership Error:", error);
          throw error;
        }
      }
      public static async UpdateMembership<T>(id: string, name: string, discount: number, dayLeft: number, price: number, rank: number): Promise<T> {
        try {
            const requestBody = {
                name,
                discount,
                dayLeft,
                price,
                rank,
            };
    
            const response = await this.axiosInstance.put<T>(`/membership/Update-membership/${id}`, requestBody);
            return response.data;
        } catch (error) {
            console.error("Update Membership Error:", error);
            throw error;
        }
    }
    
      public static async GetAllMemberships<T>(): Promise<T[]> {
        try {
          const response = await this.axiosInstance.get<T[]>('/membership/Get-All');
          return response.data;
        } catch (error) {
          console.error("Error fetching memberships:", error);
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
    public static async ResetPassword<T>(userId: string, oldPassword: string, newPassword: string): Promise<T> {
        try {
            const data = {
                userId: userId,
                oldPassword: oldPassword,
                newPassword: newPassword
            };
            
            const response = await this.axiosInstance.put<T>("user/ResetPassword", data);
            return response.data;
        } catch (error) {
            console.error("ResetPassword error:", error);
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
            const response = await this.axiosInstance.put<T>(`booking/AcceptBookingByManager/${bookingId}`)
            return response.data
        } catch (error) {
            console.log("Accept Request Error: ", error)
            throw error
        }
    }
    public static async ViewProfile<T>(data: any): Promise<T> {
        try {
            const response = await this.axiosInstance.post<T>("user/ViewProfile", data, {
                headers: { 'Content-Type': 'application/json' } 
            });
            return response.data;
        } catch (error) {
    
    
            throw error;
        }
    }
    public static async CancelBooking<T>(bookingId: string): Promise<T> {
        try {
            const response = await this.axiosInstance.put<T>(`booking/CancelBookingByManager/${bookingId}`)
            return response.data
        } catch (error) {
            console.log("Accept Request Error: ", error)
            throw error
        }
    }
    public static async GetFavoriteRooms<T>(userId: string): Promise<T[]> {
        try {
            const response = await this.axiosInstance.get<T[]>(`room/ViewListFavourite/${userId}`);
            return response.data;
        } catch (error) {
            console.error("GetFavoriteRooms error:", error);
            throw error;
        }
    }

   


// Thêm hoặc xóa phòng khỏi danh sách yêu thích
public static async UnfavoriteRoom<T>(userId: string, roomId: string): Promise<T> {
    try {
        const response = await this.axiosInstance.get<T>(
            `room/(Un)Favourite?userId=${userId}&roomId=${roomId}`
        );
        return response.data;
    } catch (error) {
        console.error("UnfavoriteRoom error:", error);
        throw error;
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
    public static async CreateArea<T>(
        name: string,
        description: string,
        address: string,
        longitude: number,
        latitude: number,
        images: File[]
    ): Promise<T> {
        try {
            const formData = new FormData();
            formData.append("Name", name);
            formData.append("Description", description);
            formData.append("Address", address);
            formData.append("Longitude", longitude.toString());
            formData.append("Latitude", latitude.toString());
    
            // Append multiple images
            images.forEach((image, index) => {
                formData.append(`Images`, image);
            });
    
            const response = await axios.post<T>(`http://localhost:5101/area/Create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.log("Create Area Error: ", error);
            throw error;
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

    public static async DeleteService<T>(id: string): Promise<T> {
        try {
            const response = await this.axiosInstance.delete<T>(`amenityservice/DeleteService/${id}`)
            return response.data;
        } catch (error) {
            console.error("Error Deleting Service: ", error)
            throw error
        }
    }

    public static async UpdateService<T>(id: string, name: string, price: number, image: File): Promise<T> {
        try {
            const formData = new FormData();
            formData.append("Name", name);
            formData.append("Price", price.toString());
            if (image) {
                formData.append("Image", image);
            } else {
                const placeholderFile = new File([""], "placeholder.txt", { type: "text/plain" });
                formData.append("Image", placeholderFile);
            }
            const response = await axios.put<T>(`http://localhost:5101/amenityservice/UpdateService/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            return response.data;
        } catch (error) {
            console.error("Error Updating Service: ", error)
            throw error
        }
    }
    
    public static async TotalUser<T>(): Promise<T> {
        try {
            const response = await this.axiosInstance.get<T>(`/user/Total`)
            return response.data;
        } catch (error) {
            console.error("Error Total: ", error)
            throw error
        }
    }
    public static async UpdateArea<T>(
        id: string,
        name: string,
        description: string,
        address: string,
        longitude: number,
        latitude: number,
        images: File[] // Thêm kiểu images là mảng File
      ): Promise<T> {
        try {
          const formData = new FormData();
          formData.append("Name", name);
          formData.append("Description", description);
          formData.append("Address", address);
          formData.append("Longitude", longitude.toString());
          formData.append("Latitude", latitude.toString());
    
          // Thêm từng hình ảnh vào formData
          images.forEach((image, index) => {
            formData.append("Images", image); // Hoặc "Image[${index}]" nếu backend yêu cầu
          });
    
          const response = await axios.put<T>(`http://localhost:5101/area/Update/${id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          return response.data;
        } catch (error) {
          console.error("Update Area Error: ", error);
          throw error;
        }
      }
    public static async CreateRoom<T>(areaId: string, type: number, name: string, price: string, description: string, images: File[]): Promise<T> {
        try {
            const utilityIds = [
                '9e87c47c-e91e-4adc-947d-9d5f17723523',
                '54cdf248-846c-4d8e-98e1-7d0a48a1982e',
                '4c756c56-6145-4137-9b62-7ec9276db800',
                '09dbc964-4755-414b-9e73-3229cd97f8ec',
                'acb81410-f3b5-4a55-863f-9ea01aca0619'
            ]
            const formData = new FormData()
            formData.append("AreaId", areaId)
            formData.append("RoomType", type.toString())
            formData.append("Name", name)
            formData.append("Price", price)
            formData.append("Description", description)
            utilityIds.forEach((id) => formData.append(`UtilitiesId`, id));

            images.forEach((image) => formData.append(`Images`, image));
            const response = await axios.post(`http://localhost:5101/room/Create`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data
        } catch (error) {
            console.error("Error creating room:", error);
            throw error;
        }
    }

    public static async TotalIncome<T>(): Promise<T> {
        try {
            const response = await this.axiosInstance.get<T>(`/transaction/Total-Income`)
            return response.data;
        } catch (error) {
            console.error("Error Total: ", error)
            throw error
        }
    }

    public static async TotalBooking<T>(): Promise<T> {
        try {
            const response = await this.axiosInstance.get<T>(`/booking/TotalBooking`)
            return response.data;
        } catch (error) {
            console.error("Error Total: ", error)
            throw error
        }
    }

    public static async Statistic<T>(year: number): Promise<T> {
        try {
            const response = await this.axiosInstance.get<T>(`/transaction/Statistic-Month/${year}`)
            return response.data;
        } catch (error) {
            console.error("Error Total: ", error)
            throw error
        }
    }

    public static async Trending<T>(): Promise<T> {
        try {
            const response = await this.axiosInstance.get<T>(`/room/Trending`)
            return response.data;
        } catch (error) {
            console.error("Error Total: ", error)
            throw error
        }
    }

    public static async DeleteRoom<T>(roomId: string) : Promise<T> {
        try {
            console.log(roomId)
            const response = await this.axiosInstance.post<T>(`/room/Delete?RoomId=${roomId}`)
            return response.data
        } catch (error) {
            console.error("Error Deleting Room", error)
            throw error
        }
    }

    public static async UpdateRoom<T>(roomId: string , type: number, name: string, price: string, description: string, images: (File | null)[]): Promise<T> {
        try {
            const formData = new FormData();
            formData.append("RoomType", type.toString());
            formData.append("Name", name);
            formData.append("Price", price);
            formData.append("Description", description);
    
            images
                .filter((image): image is File => image !== null) 
                .forEach((image) => formData.append("Images", image));
    
            for (const [key, value] of formData.entries()) {
                console.log(key, value);
            }
    
            const response = await axios.put<T>(
                `http://localhost:5101/room/Update/${roomId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error updating room:", error);
            throw error;
        }
    }

    public static async DeleteUser<T>(id: string): Promise<T> {
        try {
            const response = await this.axiosInstance.put('/user/DeleteUser', id)
            return response.data
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error
        }
    }
}