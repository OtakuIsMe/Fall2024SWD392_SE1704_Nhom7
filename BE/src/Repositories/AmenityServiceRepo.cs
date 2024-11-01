using BE.src.Domains.Database;
using BE.src.Domains.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.src.Repositories
{
    public interface IAmenityServiceRepo
    {
        Task<List<AmenityService>> GetAllAmenityService();
        Task<AmenityService?> GetAmenityServiceById(Guid amenityServiceId);
        Task<bool> CreateService(AmenityService service);
        Task<bool> CreateServiceImage(Image image);
        Task<int> CountServiceRemain(Guid serviceId);
        Task<bool> CreateServiceDetail(SerivceDetail serivceDetail);
        Task<bool> UpdateService(AmenityService service);
        Task<bool> DeleteService(Guid amenityServiceId);
        Task<bool> UpdateServiceImage(Image image);
        Task<bool> DeleteServiceImage(Guid amenityServiceId);
        Task<Image?> GetImageByServiceId(Guid amenityServiceId);
        Task<DeviceChecking?> GetDeviceChecking(Guid BookingItemsId);
        Task<bool> AddDeviceChecking(DeviceChecking deviceChecking);
        Task<bool> UpdateDeviceChecking(DeviceChecking deviceChecking);
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
            return await _context.AmenityServices
                                .Include(a => a.Image)
                                .OrderBy(a => a.CreateAt)
                                .ToListAsync();
        }

        public async Task<AmenityService?> GetAmenityServiceById(Guid amenityServiceId)
        {
            return await _context.AmenityServices.FirstOrDefaultAsync(a => a.Id == amenityServiceId);
        }

        public async Task<bool> CreateService(AmenityService service)
        {
            _context.AmenityServices.Add(service);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> CreateServiceImage(Image image)
        {
            _context.Images.Add(image);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<int> CountServiceRemain(Guid serviceId)
        {
            return await _context.SerivceDetails
                        .Where(s => s.AmenitySerivceId == serviceId && s.IsInUse == false)
                        .CountAsync();
        }

        public async Task<bool> CreateServiceDetail(SerivceDetail serivceDetail)
        {
            _context.SerivceDetails.Add(serivceDetail);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateService(AmenityService service)
        {
            _context.AmenityServices.Update(service);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteService(Guid amenityServiceId)
        {
            var service = await _context.AmenityServices.FirstOrDefaultAsync(a => a.Id == amenityServiceId);
            if (service == null)
            {
                return false;
            }
            _context.AmenityServices.Remove(service);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateServiceImage(Image image)
        {
            _context.Images.Update(image);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteServiceImage(Guid amenityServiceId)
        {
            var image = await _context.Images.FirstOrDefaultAsync(i => i.AmenityServiceId == amenityServiceId);
            if (image == null)
            {
                return false;
            }
            _context.Images.Remove(image);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Image?> GetImageByServiceId(Guid amenityServiceId)
        {
            return await _context.Images.FirstOrDefaultAsync(i => i.AmenityServiceId == amenityServiceId);
        }

        public async Task<DeviceChecking?> GetDeviceChecking(Guid bookingItemsId)
        {
            return await _context.DeviceCheckings.FirstOrDefaultAsync(d => d.BookingItemsId == bookingItemsId);
        }

        public async Task<bool> AddDeviceChecking(DeviceChecking deviceChecking)
        {
            _context.DeviceCheckings.Add(deviceChecking);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateDeviceChecking(DeviceChecking deviceChecking)
        {
            _context.DeviceCheckings.Update(deviceChecking);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}