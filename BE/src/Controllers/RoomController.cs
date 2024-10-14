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
        public async Task<IActionResult> CreateRoom([FromForm] CreateRoomRqDTO data)
        {
            return await _roomServ.CreateRoom(data);
        }
        [HttpGet("ViewDetail/{hashCode}")]
        public async Task<IActionResult> ViewRoomDetail(string hashCode)
        {
            return await _roomServ.ViewRoomDetail(hashCode);
        }

        [HttpGet("ViewFeedback/{roomId:guid}")]
        public async Task<IActionResult> GetComment(Guid roomId)
        {
            return await _roomServ.GetCommentByRoomId(roomId);
        }

        [HttpGet("ViewListFavourite/{userId:guid}")]
        public async Task<IActionResult> ViewListFavourite(Guid userId)
        {
            return await _roomServ.ViewListFavourite(userId);
        }
        [HttpGet("(Un)Favourite")]
        public async Task<IActionResult> UnOrFavouriteRoom([FromQuery] Guid roomId, [FromQuery] Guid userId)
        {
            return await _roomServ.UnOrFavouriteRoom(roomId, userId);
        }
    }
}