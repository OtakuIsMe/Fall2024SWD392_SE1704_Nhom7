using BE.src.Domains.Database;
using BE.src.Domains.DTOs.Booking;
using BE.src.Domains.Enum;
using BE.src.Domains.Models;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.Cms;
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
        Task<List<BookingCheckAvailableDTO>> GetBookingCheckAvailableList(Guid bookingId);
        Task<bool> ProcessRefund(Guid bookingId);
        Task<bool> ProcessAcceptBooking(Guid bookingId);
        Task<Booking?> GetBookingWaitOrInProgressById(Guid id);
        Task<Booking?> CheckBookedRoom(Guid roomId, DateTime DateBooking, TimeSpan TimeBooking);
        Task<Booking?> CheckBookReqUser(Guid roomId, Guid userId, DateTime DateBooking, TimeSpan TimeBooking);
        Task<List<Booking>> GetScheduleBookingForStaff(DateTime startDate, DateTime endDate);
        Task<List<Booking>> GetBookingRequestsInProgressForStaff();
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

            return bookingRequests.OrderByDescending(b => b.DateBooking.Add(b.TimeBooking)).ToList();
        }

        public async Task<List<BookingCheckAvailableDTO>> GetBookingCheckAvailableList(Guid bookingId)
        {
            var bookingAlreadyAvailable = await _context.Bookings
                .Where(b => b.Id == bookingId && b.Status == StatusBookingEnum.Wait)
                .Select(b => new BookingCheckAvailableDTO
                {
                    BookingId = b.Id,
                    TimeBooking = b.TimeBooking,
                    DateBooking = b.DateBooking,
                    Total = b.Total,
                    Status = b.Status,
                    IsPay = b.IsPay,
                    UserId = b.UserId,
                    RoomId = b.RoomId,
                    CreateAt = b.CreateAt
                })
                .FirstOrDefaultAsync();

            if (bookingAlreadyAvailable == null)
                return new List<BookingCheckAvailableDTO>();

            var bookingCheckAvailableList = await _context.Bookings
                            .Where(b => b.Status == StatusBookingEnum.Wait &&
                                        b.DateBooking.Day == bookingAlreadyAvailable.DateBooking.Day &&
                                        b.CreateAt > bookingAlreadyAvailable.CreateAt)
                            .Select(b => new BookingCheckAvailableDTO
                            {
                                BookingId = b.Id,
                                TimeBooking = b.TimeBooking,
                                DateBooking = b.DateBooking,
                                Total = b.Total,
                                Status = b.Status,
                                IsPay = b.IsPay,
                                UserId = b.UserId,
                                RoomId = b.RoomId
                            })
                            .ToListAsync();

            bool isAvailable = bookingCheckAvailableList
                .Any(b => bookingAlreadyAvailable.DateBooking >= b.DateBooking.Add(b.TimeBooking) &&
                          bookingAlreadyAvailable.DateBooking.Add(bookingAlreadyAvailable.TimeBooking) <= b.DateBooking);

            return !isAvailable ? bookingCheckAvailableList : new List<BookingCheckAvailableDTO>();
        }

        public async Task<bool> ProcessRefund(Guid bookingId)
        {
            var booking = await _context.Bookings.FindAsync(bookingId);

            if (booking == null) return false;

            if (booking.Status != StatusBookingEnum.Canceled)
            {
                return false;
            }

            var existingRefund = await _context.PaymentRefunds
                .FirstOrDefaultAsync(r => r.BookingId == bookingId);

            if (existingRefund != null) return false;

            var refundAmount = CalculateRefundAmount(booking);

            var user = await _context.Users.FindAsync(booking.UserId);

            if (user == null) return false;

            user.Wallet += refundAmount;

            _context.Users.Update(user);

            var refund = new PaymentRefund
            {
                Id = Guid.NewGuid(),
                BookingId = bookingId,
                Type = PaymentRefundEnum.Refund,
                Total = refundAmount,
                PointBonus = 0,
                CreateAt = DateTime.UtcNow
            };

            await _context.PaymentRefunds.AddAsync(refund);

            var transaction = new Transaction
            {
                Id = Guid.NewGuid(),
                TransactionType = TypeTransactionEnum.Refund,
                PaymentRefundId = refund.Id,
                UserId = booking.UserId,
                Total = refundAmount,
                CreateAt = DateTime.UtcNow
            };

            await _context.Transactions.AddAsync(transaction);

            await _context.SaveChangesAsync();

            return true;
        }

        private float CalculateRefundAmount(Booking booking)
        {
            var room = _context.Rooms.FirstOrDefault(r => r.Id == booking.RoomId);
            return room?.Price != null ? room.Price : 0;
        }

        public async Task<bool> ProcessAcceptBooking(Guid bookingId)
        {
            var booking = await _context.Bookings.FindAsync(bookingId);

            if (booking == null) return false;

            if (booking.Status != StatusBookingEnum.Canceled)
            {
                return false;
            }

            var transaction = await _context.Transactions
                .FirstOrDefaultAsync(t => t.PaymentRefundId != null && t.PaymentRefund.BookingId == bookingId &&
                                    t.UserId == booking.UserId && t.PaymentRefund.PaymentType == PaymentTypeEnum.Paypal);

            if (transaction == null) return false;

            var totalAmount = CalculateRefundAmount(booking);

            var user = await _context.Users.FindAsync(booking.UserId);

            if (user == null) return false;

            user.Wallet -= totalAmount;

            _context.Users.Update(user);

            await _context.SaveChangesAsync();

            return true;
        }
        public async Task<Booking?> GetBookingWaitOrInProgressById(Guid id)
        {
            return await _context.Bookings.FirstOrDefaultAsync(b => b.Id == id &&
                                    (b.Status == StatusBookingEnum.Wait || b.Status == StatusBookingEnum.InProgress));
        }

        public async Task<Booking?> CheckBookedRoom(Guid roomId, DateTime DateBooking, TimeSpan TimeBooking)
        {
            return _context.Bookings.AsEnumerable().FirstOrDefault(b => b.RoomId == roomId
                                    && b.Status == StatusBookingEnum.InProgress
                                    && (!(b.DateBooking.Add(b.TimeBooking) < DateBooking
                                    || DateBooking.Add(TimeBooking) < b.DateBooking)));
        }

        public async Task<Booking?> CheckBookReqUser(Guid roomId, Guid userId, DateTime DateBooking, TimeSpan TimeBooking)
        {
            return _context.Bookings.AsEnumerable().FirstOrDefault(b => b.RoomId == roomId
                                    && b.UserId == userId
                                    && b.Status == StatusBookingEnum.Wait
                                    && (!(b.DateBooking.Add(b.TimeBooking) < DateBooking
                                    || DateBooking.Add(TimeBooking) < b.DateBooking)));
        }

        public async Task<List<Booking>> GetScheduleBookingForStaff(DateTime startDate, DateTime endDate)
        {
            return await _context.Bookings.Where(b =>
                        b.Status == StatusBookingEnum.InProgress &&
                        b.DateBooking >= startDate &&
                        b.DateBooking <= endDate).ToListAsync();
        }

        public async Task<List<Booking>> GetBookingRequestsInProgressForStaff()
        {
            var bookingRequests = await _context.Bookings
                        .Include(b => b.BookingItems)
                        .Include(b => b.BookingItems)
                            .ThenInclude(bi => bi.AmenityService)
                        .Include(b => b.Room)
                            .ThenInclude(r => r.Images)
                        .Where(b => b.Status == StatusBookingEnum.Completed)
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

            return bookingRequests.OrderByDescending(b => b.DateBooking.Add(b.TimeBooking)).ToList();
        }
    }
}