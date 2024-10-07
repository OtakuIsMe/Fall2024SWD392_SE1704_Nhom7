using BE.src.Domains.Enum;
using BE.src.Repositories;
using BE.src.Shared.Type;
using Microsoft.AspNetCore.Mvc;

namespace BE.src.Services
{
    public interface IBookingServ
    {
        // Return book status of room
        Task<IActionResult> GetRoomStatusAsync(DateTime startDate, DateTime endDate);
    }

    public class BookingServ : IBookingServ
    {
        private readonly IBookingRepo _repository;

        public BookingServ(IBookingRepo repository)
        {
            _repository = repository;
        }

        public async Task<IActionResult> GetRoomStatusAsync(DateTime startDate, DateTime endDate)
        {
            var roomStatus = await _repository.GetRoomStatus(startDate, endDate);

            if (roomStatus == null)
            {
                return ErrorResp.NotFound("Not found room status");
            }
            else
            {
                return SuccessResp.Ok(roomStatus);
            }
        }
    }
}