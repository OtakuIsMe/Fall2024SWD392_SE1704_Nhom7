using BE.src.Domains.Database;
using BE.src.Domains.Models;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.Mozilla;

namespace BE.src.Repositories
{
    public interface IAreaRepo
    {
        Task<bool> CreateLocation(Location location);
        Task<bool> CreateArea(Area area);
        Task<bool> AddImageArea(Image image);
        Task<Area?> GetAreaById(Guid areaId);
        Task<List<Area>> GetAreas();
    }
    public class AreaRepo : IAreaRepo
    {
        private readonly PodDbContext _context;

        public AreaRepo(PodDbContext context)
        {
            _context = context;
        }

        public async Task<bool> CreateLocation(Location location)
        {
            _context.Locations.Add(location);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> CreateArea(Area area)
        {
            _context.Areas.Add(area);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> AddImageArea(Image image)
        {
            _context.Images.Add(image);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Area?> GetAreaById(Guid areaId)
        {
            return await _context.Areas.FirstOrDefaultAsync(a => a.Id == areaId);
        }

        public async Task<List<Area>> GetAreas()
        {
            return await _context.Areas.Include(a => a.Location).ToListAsync();
        }
    }
}