using BE.src.Domains.Database;
using BE.src.Domains.DTOs;
using BE.src.Domains.DTOs.Room;
using BE.src.Domains.Enum;
using BE.src.Domains.Models;
using BE.src.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BE.src.Controllers
{
    [ApiController]
    [Route("room/")]
    public class RoomController : ControllerBase
    {
        private readonly IRoomServ _roomServ;
        public RoomController(IRoomServ roomServ)
        {
            _roomServ = roomServ;
        }

        [HttpGet("SearchRoomByInput")]
        public async Task<IActionResult> SearchRoomByInput([FromQuery] string inputInfo)
        {
            return await _roomServ.GetRoomBySearchInput(inputInfo);
        }

        [HttpGet("FilterRoomByTypeRoom")]
        public async Task<IActionResult> FilterRoomByTypeRoom([FromQuery] TypeRoomEnum typeRoomEnum)
        {
            return await _roomServ.GetRoomByFilterTypeRoom(typeRoomEnum);
        }

        [HttpGet("{roomId}")]
        public async Task<IActionResult> GetRoomDetail(Guid roomId)
        {
            return await _roomServ.ViewRoomDetail(roomId);
        }

        [HttpGet("area/{areaId}")]
        public async Task<IActionResult> GetRoomsByArea(Guid areaId)
        {
            return await _roomServ.ViewRoomsByArea(areaId);
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateRoom([FromForm] CreateRoomRqDTO data)
        {
            return await _roomServ.CreateRoom(data);
        }
        [HttpGet("ViewDetail/{hashCode}")]
        public async Task<IActionResult> ViewRoomDetail(string hashCode)
        {
            return await _roomServ.ViewRoomDetail(hashCode);
        }

        [HttpGet("ViewDetail/{roomId:guid}")]
        public async Task<IActionResult> GetComment(Guid roomId)
        {
            return await _roomServ.GetCommentByRoomId(roomId);
        }
    }
}