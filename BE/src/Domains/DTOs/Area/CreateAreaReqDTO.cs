namespace BE.src.Domains.DTOs.Area
{
    public class CreateAreaReqDTO
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string Address { get; set; }
        public required string Longitude { get; set; }
        public required string Latitude { get; set; }
        //public required List<IFormFile> Images { get; set; }
    }
}
