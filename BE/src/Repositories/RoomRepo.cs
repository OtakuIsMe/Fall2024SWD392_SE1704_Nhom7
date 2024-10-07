using BE.src.Domains.Database;
using BE.src.Domains.DTOs;
using BE.src.Domains.Enum;
using BE.src.Domains.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.src.Repositories
{
    public interface IRoomRepo
    {
        // Search and filter room
        Task<List<Room>> SearchRoomByInput(string inputInfo);
        Task<List<Room>> FilterRoomByTypeRoom(TypeRoomEnum typeRoom);

        // Return room detail
        Task<RoomDetailDto?> GetRoomDetailsById(Guid roomId);
        Task<List<RoomDto>> GetRoomsByAreaId(Guid areaId);
    }
    public class RoomRepo : IRoomRepo
    {
        private readonly PodDbContext _context;
        public RoomRepo(PodDbContext context)
        {
            _context = context;
        }

        public async Task<List<Room>> SearchRoomByInput(string inputInfo)
        {
            return await _context.Rooms.Where(x => 
                                    x.Name.Contains(inputInfo) || 
                                    x.Price.ToString().Equals(inputInfo) || 
                                    x.Area.Name.Contains(inputInfo))
                                .Include(room => room.Images)
                                .Include(room => room.Area)
                                .Select(room => new Room{
                                    Id = room.Id,
                                    Name = room.Name,
                                    Price = room.Price,
                                    Area = room.Area,
                                    Images = room.Images
                                        .OrderByDescending(i => i.UpdateAt ?? i.CreateAt)
                                        .Select(i => new Image{
                                            Url = i.Url
                                        }).ToList()
                                }).ToListAsync();
        }


        public async Task<List<Room>> FilterRoomByTypeRoom(TypeRoomEnum typeRoom)
        {
            return await _context.Rooms.Where(x => x.TypeRoom.Equals(typeRoom))
                                        .Include(room => room.Images)
                                        .Include(room => room.Area)
                                        .Select(room => new Room{
                                                Id = room.Id,
                                                Name = room.Name,
                                                Price = room.Price,
                                                Area = room.Area,
                                                Images = room.Images
                                                    .OrderByDescending(i => i.UpdateAt ?? i.CreateAt)
                                                    .Select(i => new Image{
                                                        Url = i.Url
                                                    }).ToList()
                                        }).ToListAsync();
        }

        public async Task<RoomDetailDto?> GetRoomDetailsById(Guid roomId)
        {
            var room = await _context.Rooms
                        .Include(r => r.Images)
                        .Include(r => r.Area)
                        .FirstOrDefaultAsync(r => r.Id == roomId);

            var roomDetail = new RoomDetailDto
            {
                RoomId = room.Id,
                Name = room.Name,
                Price = room.Price,
                Status = room.Status.ToString(),
                Images = room.Images
                            .OrderByDescending(i => i.UpdateAt ?? i.CreateAt)
                            .Select(i => i.Url)
                            .ToList()
            };

            return roomDetail;
        }

        public async Task<List<RoomDto>> GetRoomsByAreaId(Guid areaId)
        {
            var rooms = await _context.Rooms
                        .Where(r => r.AreaId == areaId)
                        .Select(r => new Room
                        {
                            Id = r.Id,
                            TypeRoom = r.TypeRoom,
                            Images = r.Images
                        }).ToListAsync();

            var roomDtos = rooms.Select(r => new RoomDto
            {
                RoomId = r.Id,
                TypeRoom = r.TypeRoom,
                Images = r.Images
                        .OrderByDescending(i => i.UpdateAt ?? i.CreateAt)
                        .Select(i => i.Url)
                        .ToList()
            }).ToList();

            return roomDtos;
        }
    }
}using System.Security.Cryptography;
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
            return _context.Rooms
                                        .Include(r => r.Images)
                                        .Include(r => r.Utilities)
                                        .AsEnumerable()
                                        .Where(r => Utils.HashObject(r.Id) == hashCode)
                                        .FirstOrDefault();
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