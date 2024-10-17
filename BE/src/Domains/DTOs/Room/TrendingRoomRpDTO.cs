namespace BE.src.Domains.DTOs.Room
{
    public class TrendingRoomRpDTO
    {
        public required Models.Room Room { get; set; }
        public required float Amount { get; set; }
        public required int BookingsCount { get; set; }
    }
}