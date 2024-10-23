using BE.src.Domains.DTOs.AmenityService;
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

        [HttpPost("CreateService")]
        public async Task<IActionResult> CreateService([FromForm] CreateServiceDTO data)
        {
            return await _amenityServiceServ.CreateService(data);
        }
        [HttpPost("CreateServiceDetail")]
        public async Task<IActionResult> CreateServiceDetail([FromBody] CreateServiceDetailDTO data)
        {
            return await _amenityServiceServ.CreateServiceDetail(data);
        }
    }
}