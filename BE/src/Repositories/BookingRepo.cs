using BE.src.Domains.Database;
using BE.src.Domains.Models;

namespace BE.src.Repositories
{
    public interface IBookingRepo
    {
        Task<bool> AddBooking(Booking booking);
        Task<bool> AddBookingItems(List<BookingItem> bookingItems);
        Task<bool> UpdateBooking(Booking booking);
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

        public async Task<bool> UpdateBooking(Booking booking)
        {
            _context.Update(booking);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}