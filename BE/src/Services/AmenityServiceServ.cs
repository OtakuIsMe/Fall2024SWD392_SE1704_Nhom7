using BE.src.Repositories;
using BE.src.Shared.Type;
using Microsoft.AspNetCore.Mvc;

namespace BE.src.Services
{
    public interface IAmenityServiceServ
    {
        Task<IActionResult> GetAllAmenityService();
    }

    public class AmenityServiceServ : IAmenityServiceServ
    {
        private readonly IAmenityServiceRepo _amenityServiceRepo;

        public AmenityServiceServ(IAmenityServiceRepo amenityServiceRepo)
        {
            _amenityServiceRepo = amenityServiceRepo;
        }

        public async Task<IActionResult> GetAllAmenityService()
        {
            try
            {
                var amenityServices = await _amenityServiceRepo.GetAllAmenityService();
                return SuccessResp.Ok(amenityServices);
            }
            catch (System.Exception)
            {
                return ErrorResp.BadRequest("Error to get list Amenity and Service");
            }
        }
    }
}