using BE.src.Domains.DTOs.Room;
using BE.src.Services;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPost("Create")]
        public async Task<IActionResult> CreateRoom(CreateRoomRqDTO data)
        {
            return await _roomServ.CreateRoom(data);
        }
        [HttpGet("ViewDetail/{hashCode:string}")]
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