using BE.src.Domains.DTOs.Booking;
using BE.src.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BE.src.Controllers
{
    [Route("booking/")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingServ _bookingServ;

        public BookingController(IBookingServ bookingServ)
        {
            _bookingServ = bookingServ;
        }

        [HttpPost("room")]
        public async Task<IActionResult> BookingRoom([FromBody] BookingRoomRqDTO data)
        {
            return await _bookingServ.BookingRoom(data);
        }
    }
}
