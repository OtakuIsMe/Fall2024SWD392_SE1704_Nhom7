namespace BE.src.Domains.DTOs.Booking
{
    public class BookingScheduleRp
    {
        public required int Amount { get; set; }
        public required DateTime StartBooking { get; set; }
        public required List<BookingScheduleDTO> Bookings { get; set; }
    }

    public class BookingScheduleDTO
    {
        public required Models.Booking booking;
        public required Models.User user;
        public required Models.Room room;
    }
}