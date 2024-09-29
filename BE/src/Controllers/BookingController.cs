using BE.src.Domains.Enum;
using BE.src.Services;
using Microsoft.AspNetCore.Mvc;

namespace BE.src.Controllers
{
    [ApiController]
    [Route("booking/")]
    public class BookingController : ControllerBase
    {
        private readonly IBookingServ _service;
        public BookingController(IBookingServ service)
        {
            _service = service;
        }

        [HttpGet("status")]
        public async Task<IActionResult> GetRoomStatusAsync(StatusRoomEnum status, TimeSpan startDay, TimeSpan endDay, DateTime startDate, DateTime endDate)
        {
            return await _service.GetRoomStatusAsync(status, startDay, endDay, startDate, endDate);
        }
    }
}