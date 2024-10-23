using BE.src.Domains.DTOs.Booking;
using BE.src.Domains.Enum;
using BE.src.Domains.Models;
using BE.src.Repositories;
using BE.src.Shared.Type;
using Microsoft.AspNetCore.Mvc;
using Mysqlx;

namespace BE.src.Services
{
    public interface IBookingServ
    {
        Task<IActionResult> BookingRoom(BookingRoomRqDTO data);
        Task<IActionResult> ViewBookingListOfRoom(Guid roomId);
        Task<IActionResult> AcceptBooking(Guid bookingId);
        Task<IActionResult> CancelBooking(Guid bookingId);
        Task<IActionResult> GetBookingRequests();
        Task<IActionResult> GetBookingCheckAvailableList(Guid bookingId);
    }

    public class BookingServ : IBookingServ
    {
        private readonly IBookingRepo _bookingRepo;
        private readonly IUserRepo _userRepo;
        private readonly IAmenityServiceRepo _amenityRepo;
        private readonly IRoomRepo _roomRepo;

        public BookingServ(IBookingRepo bookingRepo, IUserRepo userRepo, IAmenityServiceRepo amenityRepo, IRoomRepo roomRepo)
        {
            _bookingRepo = bookingRepo;
            _userRepo = userRepo;
            _amenityRepo = amenityRepo;
            _roomRepo = roomRepo;
        }

        public async Task<IActionResult> BookingRoom(BookingRoomRqDTO data)
        {
            try
            {
                float total = 0;
                Membership? userMembership = await _userRepo.GetMemberShipByUserId(data.UserId);
                Booking booking = new()
                {
                    TimeBooking = TimeSpan.FromHours(data.TimeHourBooking),
                    DateBooking = data.DateBooking,
                    Status = StatusBookingEnum.Wait,
                    UserId = data.UserId,
                    RoomId = data.RoomId,
                    IsPay = false
                };

                Room? room = await _roomRepo.GetRoomById(data.RoomId);

                if (room == null)
                {
                    return ErrorResp.NotFound("Cant not find room");
                }

                total += room.Price * data.TimeHourBooking;

                bool isCreatedBooking = await _bookingRepo.AddBooking(booking);

                if (!isCreatedBooking)
                {
                    return ErrorResp.BadRequest("Error to create booking");
                }

                if (!(data.BookingItemDTOs == null || data.BookingItemDTOs.Count == 0))
                {
                    List<BookingItem> bookingItems = new List<BookingItem>();
                    foreach (var item in data.BookingItemDTOs)
                    {
                        AmenityService? amenityService = await _amenityRepo.GetAmenityServiceById(item.ItemsId);

                        if (amenityService == null)
                        {
                            return ErrorResp.NotFound("Cant fount this amenity or service");
                        }

                        BookingItem bookingItem = new BookingItem
                        {
                            AmountItems = item.Amount,
                            Total = amenityService.Price * item.Amount,
                            AmenityServiceId = item.ItemsId,
                            Status = StatusBookingItemEnum.Active,
                            BookingId = booking.Id
                        };

                        total += bookingItem.Total;

                        bookingItems.Add(bookingItem);
                    }
                    bool isCreatingBookingItem = await _bookingRepo.AddBookingItems(bookingItems);
                    if (!isCreatingBookingItem)
                    {
                        return ErrorResp.BadRequest("Error to create booking items");
                    }
                }
                if (userMembership != null)
                {
                    total *= userMembership.Discount;
                }

                booking.Total = total;

                await _bookingRepo.UpdateBooking(booking);

                return SuccessResp.Ok(booking.Id);
            }
            catch (Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }

        public async Task<IActionResult> ViewBookingListOfRoom(Guid roomId)
        {
            try
            {
                List<Booking> bookings = await _bookingRepo.ViewBookingOfRoomInFuture(roomId);
                return SuccessResp.Ok(bookings);
            }
            catch (System.Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }

        public async Task<IActionResult> AcceptBooking(Guid bookingId)
        {
            try
            {
                var isAccept = await _bookingRepo.AcceptBooking(bookingId);
                if (isAccept)
                {
                    var isConfirmed = await _bookingRepo.ProcessAcceptBooking(bookingId);
                    if (!isConfirmed)
                    {
                        return ErrorResp.BadRequest("Can not confirm booking");
                    }
                    return SuccessResp.Ok("Accept booking success");
                }
                else
                {
                    return ErrorResp.NotFound("Can not find booking");
                }
            }
            catch (System.Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }

        public async Task<IActionResult> CancelBooking(Guid bookingId)
        {
            try
            {
                var isDecline = await _bookingRepo.DeclineBooking(bookingId);
                if (isDecline)
                {
                    var isRefunded = await _bookingRepo.ProcessRefund(bookingId);
                    if (isRefunded)
                    {
                        return SuccessResp.Ok("Booking canceled and refund processed successfully.");
                    }
                    else
                    {
                        return ErrorResp.BadRequest("Booking canceled, but no refund applicable.");
                    }
                }
                else
                {
                    return ErrorResp.NotFound("Cannot find booking");
                }
            }
            catch (Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }

        public async Task<IActionResult> GetBookingRequests()
        {
            try
            {
                var bookingRequests = await _bookingRepo.GetBookingRequests();
                if (bookingRequests == null)
                {
                    return ErrorResp.NotFound("Can not find booking requests");
                }
                return SuccessResp.Ok(bookingRequests);
            }
            catch (System.Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }

        public async Task<IActionResult> GetBookingCheckAvailableList(Guid bookingId)
        {
            try
            {
                var bookingCheckAvailableList = await _bookingRepo.GetBookingCheckAvailableList(bookingId);
                if (bookingCheckAvailableList == null)
                {
                    return ErrorResp.NotFound("Can not find booking check available list");
                }
                return SuccessResp.Ok(bookingCheckAvailableList);   
            }
            catch (System.Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }
    }
}