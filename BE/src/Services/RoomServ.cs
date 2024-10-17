using BE.src.Domains.DTOs;
using BE.src.Domains.Models;
using BE.src.Repositories;
using BE.src.Shared.Type;
using Microsoft.AspNetCore.Mvc;
using BE.src.Util;
using BE.src.Domains.Enum;
using BE.src.Domains.DTOs.Room;

namespace BE.src.Services
{
    public interface IRoomServ
    {
        // Search and filter room
        Task<IActionResult> GetRoomBySearchInput(string inputInfo);
        Task<IActionResult> GetRoomByFilterTypeRoom(TypeRoomEnum typeRoom);
        Task<IActionResult> GetRoomListWithBookingTimes(Guid? areaId, TypeRoomEnum? typeRoom, DateTime? startDate, DateTime? endDate);

        // Return room detail
        Task<IActionResult> ViewRoomDetail(Guid roomId);
        Task<IActionResult> ViewRoomsByArea(Guid areaId);

        Task<IActionResult> CreateRoom(CreateRoomRqDTO data);
        Task<IActionResult> ViewRoomDetail(string hashCode);
        Task<IActionResult> GetCommentByRoomId(Guid roomId);
        Task<IActionResult> ViewListFavourite(Guid userId);
        Task<IActionResult> UnOrFavouriteRoom(Guid roomId, Guid userId);
        Task<IActionResult> GetScheduleRoom(RoomScheduleRqDTO data);
        Task<IActionResult> TrendingRoom();
    }
    public class RoomServ : IRoomServ
    {
        private readonly IRoomRepo _roomRepo;
        private readonly IAreaRepo _areaRepo;
        private readonly IBookingRepo _bookingRepo;

        public RoomServ(IRoomRepo roomRepo, IAreaRepo areaRepo, IBookingRepo bookingRepo)
        {
            _roomRepo = roomRepo;
            _areaRepo = areaRepo;
            _bookingRepo = bookingRepo;
        }

        public async Task<IActionResult> GetRoomBySearchInput(string inputInfo)
        {
            var room = await _roomRepo.SearchRoomByInput(inputInfo);
            if (room == null)
            {
                return ErrorResp.NotFound("Not found room");
            }
            else
            {
                return SuccessResp.Ok(room);
            }
        }

        public async Task<IActionResult> GetRoomByFilterTypeRoom(TypeRoomEnum typeRoom)
        {
            var room = await _roomRepo.FilterRoomByTypeRoom(typeRoom);
            if (room == null)
            {
                return ErrorResp.NotFound("Not found room");
            }
            else
            {
                return SuccessResp.Ok(room);
            }
        }

        public async Task<IActionResult> ViewRoomDetail(Guid roomId)
        {
            var roomDetail = await _roomRepo.GetRoomDetailsById(roomId);

            if (roomDetail == null)
            {
                return ErrorResp.NotFound("Not found room");
            }
            else
            {
                return SuccessResp.Ok(roomDetail);
            }
        }

        public async Task<IActionResult> ViewRoomsByArea(Guid areaId)
        {
            var rooms = await _roomRepo.GetRoomsByAreaId(areaId);

            if (rooms == null)
            {
                return ErrorResp.NotFound("Not found room");
            }
            else
            {
                return SuccessResp.Ok(rooms);
            }
        }

        public async Task<IActionResult> CreateRoom(CreateRoomRqDTO data)
        {
            try
            {
                Area? area = await _areaRepo.GetAreaById(data.AreaId);
                List<Utility> utilities = await _roomRepo.GetListUtilitiesById(data.UtilitiesId);
                if (area == null)
                {
                    return ErrorResp.BadRequest("Error getting area");
                }
                var room = new Room
                {
                    TypeRoom = data.RoomType,
                    Name = data.Name,
                    Price = data.Price,
                    Status = StatusRoomEnum.Available,
                    Description = data.Description,
                    AreaId = data.AreaId,
                    Utilities = utilities
                };
                var isCreatedRoom = await _roomRepo.CreateRoom(room);
                if (!isCreatedRoom)
                {
                    return ErrorResp.BadRequest("Error Creating room");
                }
                else
                {
                    int count = 0;
                    foreach (IFormFile image in data.Images)
                    {
                        string? urlFirebase = await Utils.UploadImgToFirebase(image, count.ToString(), $"Room/{Utils.ConvertToUnderscore(area.Name)}/{Utils.ConvertToUnderscore(data.Name)}");
                        if (urlFirebase == null)
                        {
                            return ErrorResp.BadRequest("Fail to save image to firebase");
                        }
                        var imageObj = new Image
                        {
                            Room = room,
                            Url = urlFirebase
                        };
                        var isImageCreated = await _roomRepo.AddImageRoom(imageObj);
                        if (!isImageCreated)
                        {
                            return ErrorResp.BadRequest("Fail to save image to database");
                        }
                        count++;
                    }
                    return SuccessResp.Created("Create room success");
                }
            }
            catch (Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }

        public async Task<IActionResult> ViewRoomDetail(string hashCode)
        {
            try
            {
                var room = await _roomRepo.GetRoomDetailByHashCode(hashCode);
                if (room == null)
                {
                    return ErrorResp.NotFound("Cant found the room");
                }
                int favouriteCount = await _roomRepo.GetCountFavouriteRoom(room.Id);
                RoomDetailRpDTO returnRoom = new()
                {
                    Info = room,
                    FavouriteCount = favouriteCount
                };
                return SuccessResp.Ok(returnRoom);
            }
            catch (System.Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }
        public async Task<IActionResult> GetCommentByRoomId(Guid roomId)
        {
            try
            {
                List<RatingFeedback> ratingFeedbacks = await _roomRepo.GetListRatingFeedback(roomId);
                return SuccessResp.Ok(ratingFeedbacks);
            }
            catch (System.Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }
        public async Task<IActionResult> ViewListFavourite(Guid userId)
        {
            try
            {
                List<Room> rooms = await _roomRepo.GetListFavouriteRoom(userId);
                return SuccessResp.Ok(rooms);
            }
            catch (System.Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }

        public async Task<IActionResult> UnOrFavouriteRoom(Guid roomId, Guid userId)
        {
            try
            {
                Favourite? favouriteRoom = await _roomRepo.GetFavouriteRoomByUser(roomId, userId);
                if (favouriteRoom != null)
                {
                    bool isDelete = await _roomRepo.DeleteFavouriteRoom(favouriteRoom);
                    if (isDelete)
                    {
                        return SuccessResp.Ok("Remove favourite success");
                    }
                    else
                    {
                        return ErrorResp.BadRequest("Fail to remove favourite");
                    }
                }
                else
                {
                    Favourite newFavouriteRoom = new()
                    {
                        RoomId = roomId,
                        UserId = userId
                    };
                    bool isAdd = await _roomRepo.AddFavouriteRoom(newFavouriteRoom);
                    if (isAdd)
                    {
                        return SuccessResp.Ok("Add favourite success");
                    }
                    else
                    {
                        return ErrorResp.BadRequest("Fail to add favourite");
                    }
                }
            }
            catch (System.Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }

        public async Task<IActionResult> GetScheduleRoom(RoomScheduleRqDTO data)
        {
            try
            {
                List<RoomScheduleRpDTO> roomSchedules = new List<RoomScheduleRpDTO>();
                List<Booking> availableBookings = await _bookingRepo.ViewBookingAvailablePeriod(data.RoomId, data.StartDate, data.EndDate);

                return SuccessResp.Ok(roomSchedules);
            }
            catch (System.Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }
        public async Task<IActionResult> TrendingRoom(){
            try
            {
                return SuccessResp.Ok("");
            }
            catch (System.Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }
        public async Task <IActionResult> GetRoomListWithBookingTimes(Guid areaId, TypeRoomEnum typeRoom, DateTime startDate, DateTime endDate)
        {
            try
            {
                List<Room> rooms = await _roomRepo.GetRoomListWithBookingTimes(areaId, typeRoom, startDate, endDate);
                return SuccessResp.Ok(rooms);
            }
            catch (System.Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }
    }
}