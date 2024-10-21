using BE.src.Domains.Models.Base;

namespace BE.src.Domains.Models
{
    public class AmenityService : BaseEntity
    {
        public string Name { get; set; } = null!;
        public float Price { get; set; }

        public ICollection<BookingItem> BookingItems { get; set; } = null!;
    }
}