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

    public static async BookRoom<T>(userId: string, roomId: string, bookingItemDTOs: object[], timeBooking: object, dateBooking: string): Promise<T> {
        try {
            const bookingData = {
                roomId: roomId,
                userId: userId,
                bookingItemDTOs: bookingItemDTOs,
                timeBooking: timeBooking,
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

    public static async payBill<T>(bookingId: string): Promise<T> {
        try {
            const bookingid = bookingId;
            const response = await this.axiosInstance.post<T>(`transaction/Payment-PayPal-Create`, bookingid);
            
            console.log(response.data);
            return response.data
        } catch (error) {
            console.error("Transaction error:", error);
            throw error;
        }
    }
<<<<<<< HEAD
=======

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
            const response = await this.axiosInstance.put<T>(`booking/CancelBooking/${bookingId}`)
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
            formData.append("Image", image);
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
            for (const [key, value] of formData.entries()) {
                console.log(key, value);
            }
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
            const response = await this.axiosInstance.post<T>(`/room/Delete`, roomId)
            return response.data
        } catch (error) {
            console.error("Error Deleting Room", error)
            throw error
        }
    }

    public static async UpdateRoom<T>(areaId: string, type: number, name: string, price: string, description: string, utilityIds: string[],images: File[]): Promise<T> {
        try {
            const formData = new FormData()
            formData.append("AreaId", areaId)
            formData.append("RoomType", type.toString())
            formData.append("Name", name)
            formData.append("Price", price)
            formData.append("Description", description)
            utilityIds.forEach((id) => formData.append(`UtilitiesId`, id));

            images.forEach((image) => formData.append(`Images`, image));
            for (const [key, value] of formData.entries()) {
                console.log(key, value);
            }
            const response = await axios.put(`http://localhost:5101/room/Update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data
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
>>>>>>> parent of ef202b4 (Merge branch 'dat' into thanh)
}