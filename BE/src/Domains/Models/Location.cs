using BE.src.Domains.Models.Base;

namespace BE.src.Domains.Models
{
    public class Location : BaseEntity
    {
        public string Address { get; set; } = null!;
        public string Longitude { get; set; } = null!;
        public string Latitude { get; set; } = null!;

        public Area Area { get; set; } = null!;
    }
}