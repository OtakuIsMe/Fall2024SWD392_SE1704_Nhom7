using BE.src.Domains.Database;
using BE.src.Domains.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.src.Repositories
{
    public interface IRoomRepo
    {
        Task<bool> CreateRoom(Room room);
        Task<bool> AddImageRoom(Image image);
        Task<List<Utility>> GetListUtilitiesById(List<Guid> UtilitiesId);
    }

    public class RoomRepo : IRoomRepo
    {
        private readonly PodDbContext _context;

        public RoomRepo(PodDbContext context)
        {
            _context = context;
        }

        public async Task<bool> CreateRoom(Room room)
        {
            _context.Rooms.Add(room);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> AddImageRoom(Image image)
        {
            _context.Images.Add(image);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List<Utility>> GetListUtilitiesById(List<Guid> UtilitiesId)
        {
            return await _context.Utilities.Where(u => UtilitiesId.Contains(u.Id))
                                    .ToListAsync();
        }

    }
}