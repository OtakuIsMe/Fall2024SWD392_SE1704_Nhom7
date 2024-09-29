using BE.src.Domains.Database;
using BE.src.Domains.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.src.Repositories
{
    public interface IAmenityServiceRepo
    {
        Task<List<AmenityService>> GetAllAmenityService();
    }

    public class AmenityServiceRepo : IAmenityServiceRepo
    {
        private readonly PodDbContext _context;

        public AmenityServiceRepo(PodDbContext context)
        {
            _context = context;
        }

        public async Task<List<AmenityService>> GetAllAmenityService()
        {
            return await _context.AmenityServices.ToListAsync();
        }
    }
}