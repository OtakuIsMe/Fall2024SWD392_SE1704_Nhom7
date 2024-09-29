using BE.src.Domains.Database;
using BE.src.Domains.DTOs;
using BE.src.Domains.Enum;
using BE.src.Domains.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.src.Repositories
{
    public interface IBookingRepo
    {
        // Find room by id
        Task<Room?> GetRoomById(Guid roomId);

        // Return book status of room
        Task<List<RoomStatusDto>> GetRoomStatus(StatusRoomEnum status, TimeSpan startDay, TimeSpan endDay, DateTime startDate, DateTime endDate);
    }

    public class BookingRepo : IBookingRepo
    {
        private readonly PodDbContext _context;

        public BookingRepo(PodDbContext context)
        {
            _context = context;
        }

        public async Task<Room?> GetRoomById(Guid roomId)
        {
            return await _context.Rooms.FirstOrDefaultAsync(r => r.Id == roomId);
        }

        public async Task<List<RoomStatusDto>> GetRoomStatus(StatusRoomEnum status, TimeSpan startDay, TimeSpan endDay, DateTime startDate, DateTime endDate)
        {
            var roomBookings = await _context.Bookings
                .Where(b => b.Room.Status == status 
                            && ((b.DateBooking >= startDate && b.DateBooking <= endDate) 
                                || (b.TimeBooking >= startDay && b.TimeBooking <= endDay)
                                || (b.DateBooking <= startDate && b.DateBooking >= endDate))) 
                .Select(b => new RoomStatusDto
                {
                    RoomId = b.RoomId,
                    IsRented = b.Room.Status == status,
                    StartDay = startDay,
                    EndDay = endDay,
                    StartDate = startDate,
                    EndDate = endDate
                }).ToListAsync();

            return roomBookings;
        }
    }
}