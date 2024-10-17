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

        [HttpGet("ViewBookingRoom/{roomId:guid}")]
        public async Task<IActionResult> GetBookingOfRoom(Guid roomId)
        {
            return await _bookingServ.ViewBookingListOfRoom(roomId);
        }

        [HttpPut("AcceptBooking/{bookingId:guid}")]
        public async Task<IActionResult> AcceptBooking(Guid bookingId)
        {
            return await _bookingServ.AcceptBooking(bookingId);
        }

        [HttpPut("CancelBooking/{bookingId:guid}")]
        public async Task<IActionResult> CancelBooking(Guid bookingId)
        {
            return await _bookingServ.CancelBooking(bookingId);
        }   

        [HttpGet("GetBookingRequests")]
        public async Task<IActionResult> GetBookingRequests()
        {
            return await _bookingServ.GetBookingRequests();
        }
    }
}
