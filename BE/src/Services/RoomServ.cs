using BE.src.Domains.DTOs;
using BE.src.Domains.Models;
using BE.src.Repositories;
using BE.src.Shared.Type;
using Microsoft.AspNetCore.Mvc;
using BE.src.Util;
using BE.src.Domains.Enum;

namespace BE.src.Services
{
    public interface IRoomServ
    {
        // Search and filter room
        Task<IActionResult> GetRoomBySearchInput(string inputInfo);
        Task<IActionResult> GetRoomByFilterTypeRoom(TypeRoomEnum typeRoom);

        // Return room detail
        Task<IActionResult> ViewRoomDetail(Guid roomId);
        Task<IActionResult> ViewRoomsByArea(Guid areaId);
    }
    public class RoomServ : IRoomServ
    {
        private readonly IRoomRepo _roomRepo;

        public RoomServ(IRoomRepo roomRepo)
        {
            _roomRepo = roomRepo;
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
    }
}