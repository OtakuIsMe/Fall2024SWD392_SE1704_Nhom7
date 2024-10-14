using BE.src.Domains.Database;
using BE.src.Domains.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.src.Repositories
{
    public interface IBookingRepo
    {
        Task<bool> AddBooking(Booking booking);
        Task<bool> AddBookingItems(List<BookingItem> bookingItems);
        Task<bool> UpdateBooking(Booking booking);
        Task<List<Booking>> ViewBookingOfRoomInFuture(Guid roomId);
        Task<Booking?> GetBookingById(Guid id);
    }
    public class BookingRepo : IBookingRepo
    {
        private readonly PodDbContext _context;
        public BookingRepo(PodDbContext context)
        {
            _context = context;
        }

        public async Task<bool> AddBooking(Booking booking)
        {
            _context.Bookings.Add(booking);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> AddBookingItems(List<BookingItem> bookingItems)
        {
            _context.BookingItems.AddRange(bookingItems);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Booking?> GetBookingById(Guid id)
        {
            return await _context.Bookings.FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task<bool> UpdateBooking(Booking booking)
        {
            _context.Update(booking);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List<Booking>> ViewBookingOfRoomInFuture(Guid roomId)
        {
            return await _context.Bookings.Where(b => b.RoomId == roomId && b.DateBooking > DateTime.Now).ToListAsync();
        }
    }
}