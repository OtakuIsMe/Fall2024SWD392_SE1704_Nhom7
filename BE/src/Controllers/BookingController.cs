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

        [HttpPut("AcceptBookingByManager/{bookingId:guid}")]
        public async Task<IActionResult> AcceptBooking(Guid bookingId)
        {
            return await _bookingServ.AcceptBooking(bookingId);
        }

        [HttpPut("CancelBookingByManager/{bookingId:guid}")]
        public async Task<IActionResult> CancelBooking(Guid bookingId)
        {
            return await _bookingServ.CancelBooking(bookingId);
        }

        [HttpGet("GetBookingRequests")]
        public async Task<IActionResult> GetBookingRequests()
        {
            return await _bookingServ.GetBookingRequests();
        }

        [HttpGet("CancleBookingByCustomrer/{bookingId:guid}")]
        public async Task<IActionResult> CancleBookingByCustomer(Guid bookingId)
        {
            return await _bookingServ.CancleBookingByCustomer(bookingId);
        }

        [HttpGet("GetBookingCheckAvailableList")]
        public async Task<IActionResult> GetBookingCheckAvailableList([FromQuery] Guid bookingId)
        {
            return await _bookingServ.GetBookingCheckAvailableList(bookingId);
        }

        [HttpGet("GetScheduleBookingForStaff")]
        public async Task<IActionResult> GetScheduleBookingForStaff([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            return await _bookingServ.GetScheduleBookingForStaff(startDate, endDate);
        }

        [HttpGet("check-in")]
        public async Task<IActionResult> GetBookingRequestsInProgressForStaff()
        {
            return await _bookingServ.GetBookingRequestsInProgressForStaff();
        }
    }
}
