using System.Security.Cryptography.X509Certificates;
using BE.src.Domains.DTOs.Room;
using BE.src.Domains.Enum;
using BE.src.Domains.Models;
using BE.src.Repositories;
using BE.src.Shared.Type;
using BE.src.Util;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;

namespace BE.src.Services
{
    public interface IRoomServ
    {
        Task<IActionResult> CreateRoom(CreateRoomRqDTO data);
        Task<IActionResult> ViewRoomDetail(string hashCode);
        Task<IActionResult> GetCommentByRoomId(Guid roomId);
    }

    public class RoomServ : IRoomServ
    {
        private readonly IRoomRepo _roomRepo;
        private readonly IAreaRepo _areaRepo;

        public RoomServ(IRoomRepo roomRepo, IAreaRepo areaRepo)
        {
            _roomRepo = roomRepo;
            _areaRepo = areaRepo;
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
                Room? room = await _roomRepo.GetRoomDetailByHashCode(hashCode);
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
    }
}