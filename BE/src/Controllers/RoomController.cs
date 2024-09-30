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
    }
}