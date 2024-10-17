using BE.src.Domains.Database;
using BE.src.Domains.Enum;
using BE.src.Domains.Models;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto.Engines;

namespace BE.src.Repositories
{
    public interface IBookingRepo
    {
        Task<bool> AddBooking(Booking booking);
        Task<bool> AddBookingItems(List<BookingItem> bookingItems);
        Task<bool> UpdateBooking(Booking booking);
        Task<List<Booking>> ViewBookingOfRoomInFuture(Guid roomId);
        Task<Booking?> GetBookingById(Guid id);
        Task<List<Booking>> ViewBookingAvailablePeriod(Guid RoomId, DateTime StartDate, DateTime EndDate);
        Task<bool> AcceptBooking(Guid bookingId);
        Task<bool> DeclineBooking(Guid bookingId);
        Task<List<Booking>> GetBookingRequests();
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

        public async Task<List<Booking>> ViewBookingAvailablePeriod(Guid RoomId, DateTime StartDate, DateTime EndDate)
        {
            return await _context.Bookings
                                    .Where(b => b.RoomId == RoomId
                                            && b.DateBooking >= StartDate && b.DateBooking <= EndDate
                                            && b.IsPay)
                                    .ToListAsync();
        }


        public async Task<bool> AcceptBooking(Guid bookingId)
        {
            var booking = await _context.Bookings.FindAsync(bookingId);

            if (booking == null) return false;

            booking.Status = StatusBookingEnum.Completed;
            booking.CreateAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeclineBooking(Guid bookingId)
        {
            var booking = await _context.Bookings.FindAsync(bookingId);

            if (booking == null) return false;

            booking.Status = StatusBookingEnum.Canceled;
            booking.CreateAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<Booking>> GetBookingRequests()
        {
            var bookingRequests = await _context.Bookings
                        .Include(b => b.BookingItems)
                        .Include(b => b.BookingItems)
                            .ThenInclude(bi => bi.AmenityService)
                        .Include(b => b.Room)
                            .ThenInclude(r => r.Images) 
                        .Where(b => b.Status == StatusBookingEnum.Wait)
                        .Select(b => new Booking
                        {
                            Id = b.Id,
                            Total = b.Total,
                            Status = b.Status,
                            IsPay = b.IsPay,
                            DateBooking = b.DateBooking,
                            TimeBooking = b.TimeBooking,
                            User = new User
                            {
                                Id = b.User.Id,
                                Name = b.User.Name,
                                Email = b.User.Email,
                                Phone = b.User.Phone,
                                Image = b.User.Image != null 
                                    ? new Image
                                    {
                                        Id = b.User.Image.Id,
                                        Url = b.User.Image.Url
                                    }
                                    : null
                            },
                            Room = new Room
                            {
                                Id = b.Room.Id,
                                Name = b.Room.Name,
                                Images = b.Room.Images
                                    .OrderByDescending(i => i.CreateAt)
                                    .Take(1) 
                                    .Select(i => new Image
                                    {
                                        Id = i.Id,
                                        Url = i.Url
                                    }).ToList()
                            },
                            BookingItems = b.BookingItems
                                .Select(bi => new BookingItem
                                {
                                    Id = bi.Id,
                                    AmountItems = bi.AmountItems,
                                    Total = bi.Total,
                                    AmenityService = new AmenityService
                                    {
                                        Id = bi.AmenityService.Id,
                                        Name = bi.AmenityService.Name
                                    }
                                }).ToList()
                        })
                        .ToListAsync();

            return bookingRequests;
        }
    }
}