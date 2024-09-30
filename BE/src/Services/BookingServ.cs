using BE.src.Domains.DTOs.Booking;
using BE.src.Domains.Enum;
using BE.src.Domains.Models;
using BE.src.Repositories;
using BE.src.Shared.Type;
using Microsoft.AspNetCore.Mvc;

namespace BE.src.Services
{
    public interface IBookingServ
    {
        Task<IActionResult> BookingRoom(BookingRoomRqDTO data);
    }

    public class BookingServ : IBookingServ
    {
        private readonly IBookingRepo _bookingRepo;
        private readonly IUserRepo _userRepo;
        private readonly IAmenityServiceRepo _amenityRepo;

        public BookingServ (IBookingRepo bookingRepo, IUserRepo userRepo, IAmenityServiceRepo amenityRepo)
        {
            _bookingRepo = bookingRepo;
            _userRepo = userRepo;
            _amenityRepo = amenityRepo;
        }

        public async Task<IActionResult> BookingRoom(BookingRoomRqDTO data)
        {
            try
            {
                Membership? userMembership = await _userRepo.GetMemberShipByUserId(data.UserId);
                Booking booking = new Booking
                {
                    TimeBooking = data.TimeBooking,
                    DateBooking = data.DateBooking,
                    Status = StatusBookingEnum.Wait,
                    UserId = data.UserId,
                    RoomId = data.RoomId,
                };

                bool isCreatedBooking = await _bookingRepo.AddBooking(booking);

                if (!isCreatedBooking) {
                    ErrorResp.BadRequest("Error to create booking");
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
                            Total = amenityService.Price*item.Amount,
                            AmenityServiceId = item.ItemsId,
                            Status = StatusBookingItemEnum.Active,
                            BookingId = booking.Id
                        };
                        bookingItems.Add(bookingItem);
                    }
                    bool isCreatingBookingItem = await _bookingRepo.AddBookingItems(bookingItems);
                    if (isCreatingBookingItem)
                    {
                        return ErrorResp.BadRequest("Error to create booking items");
                    }
                }
                return SuccessResp.Ok("Booking room success");
            }
            catch (Exception ex) {
                return ErrorResp.BadRequest(ex.Message);
            }
        }
    }
}