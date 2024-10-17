using BE.src.Domains.Enum;

namespace BE.src.Domains.DTOs.Room
{
    public class BookingsTrendRpDTO
    {
        public required TypeRoomEnum type;
        public required List<Models.Room> Rooms;
        public required float Total;
    }
}