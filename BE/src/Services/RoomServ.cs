using BE.src.Domains.DTOs.Room;
using BE.src.Domains.Enum;
using BE.src.Domains.Models;
using BE.src.Repositories;
using BE.src.Shared.Type;
using BE.src.Util;
using Microsoft.AspNetCore.Mvc;

namespace BE.src.Services
{
    public interface IRoomServ
    {
        Task<IActionResult> CreateRoom(CreateRoomRqDTO data);
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
                    foreach (IFormFile image in data.Images)
                    {
                        string? urlFirebase = await Utils.UploadImgToFirebase(image, Utils.ConvertToUnderscore(data.Name), $"Room/{Utils.ConvertToUnderscore(area.Name)}/");
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
                    }
                    return SuccessResp.Created("Create room success");
                }
            }
            catch (Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }
    }
}