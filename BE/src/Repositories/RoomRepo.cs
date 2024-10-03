using System.Security.Cryptography;
using BE.src.Domains.Database;
using BE.src.Domains.Models;
using BE.src.Util;
using Microsoft.EntityFrameworkCore;

namespace BE.src.Repositories
{
    public interface IRoomRepo
    {
        Task<Room?> GetRoomById(Guid roomId);
        Task<bool> CreateRoom(Room room);
        Task<bool> AddImageRoom(Image image);
        Task<List<Utility>> GetListUtilitiesById(List<Guid> UtilitiesId);
        Task<Room?> GetRoomDetailByHashCode(string hashCode);
        Task<int> GetCountFavouriteRoom(Guid roomId);
        Task<List<RatingFeedback>> GetListRatingFeedback(Guid roomId);
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

        public async Task<Room?> GetRoomDetailByHashCode(string hashCode)
        {
            return await _context.Rooms.Where(r => Utils.HashObject<Guid>(r.Id) == hashCode)
                                        .Include(r => r.Images)
                                        .Include(r => r.Utilities)
                                        .FirstOrDefaultAsync();
        }

        public async Task<int> GetCountFavouriteRoom(Guid roomId)
        {
            return await _context.Favourites.Where(f => f.RoomId == roomId)
                                            .CountAsync();
        }

        public async Task<List<RatingFeedback>> GetListRatingFeedback(Guid roomId)
        {
            return await _context.RatingFeedbacks.Where(rf => rf.RoomId == roomId)
                                                .Include(rf => rf.User)
                                                    .ThenInclude(rf => rf.Image)
                                                .OrderByDescending(rf => rf.CreateAt)
                                                .ToListAsync();
        }

        public async Task<Room?> GetRoomById(Guid roomId)
        {
            return await _context.Rooms.FirstOrDefaultAsync(r => r.Id == roomId);
        }
    }
}