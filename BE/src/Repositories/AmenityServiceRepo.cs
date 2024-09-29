using BE.src.Domains.Database;
using BE.src.Domains.DTOs;
using Microsoft.EntityFrameworkCore;

namespace BE.src.Repositories
{
    public interface IAmenityServiceRepository
    {
        Task<List<AmenitiesServiceDto>> GetAllServices();
    }

    public class AmenityServiceRepository : IAmenityServiceRepository
    {
        private readonly PodDbContext _context;

        public AmenityServiceRepository(PodDbContext context)
        {
            _context = context;
        }

        public async Task<List<AmenitiesServiceDto>> GetAllServices()
        {
            return await _context.AmenityServices
                        .Select(s => new AmenitiesServiceDto
                        {
                            Id = s.Id,
                            Name = s.Name,
                            Price = s.Price
                        })
                        .ToListAsync();
        }
    }
}