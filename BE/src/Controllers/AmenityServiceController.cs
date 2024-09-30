using BE.src.Services;
using Microsoft.AspNetCore.Mvc;

namespace BE.src.Controllers
{
    [ApiController]
    [Route("amenityservice/")]

    public class AmenityServiceController : ControllerBase
    {
        private readonly IAmenityServiceServ _amenityServiceServ;

        public AmenityServiceController(IAmenityServiceServ amenityServiceServ)
        {
            _amenityServiceServ = amenityServiceServ;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllAmenityService()
        {
            return await _amenityServiceServ.GetAllAmenityService();
        }
    }
}