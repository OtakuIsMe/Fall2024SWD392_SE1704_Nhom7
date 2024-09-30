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
        Task<Room?> SearchRoomByInput(string inputInfo);
        Task<Room?> FilterRoomByTypeRoom(TypeRoomEnum typeRoom);

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

        public async Task<Room?> SearchRoomByInput(string inputInfo)
        {
            return await _context.Rooms.Where(x => 
                                    x.Name.Contains(inputInfo) || 
                                    x.Price.ToString().Equals(inputInfo) || 
                                    x.Area.Name.Contains(inputInfo))
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
                                }).FirstOrDefaultAsync();
        }


        public async Task<Room?> FilterRoomByTypeRoom(TypeRoomEnum typeRoom)
        {
            return await _context.Rooms.Where(x => x.TypeRoom.Equals(typeRoom))
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
                                        }).FirstOrDefaultAsync();
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
}