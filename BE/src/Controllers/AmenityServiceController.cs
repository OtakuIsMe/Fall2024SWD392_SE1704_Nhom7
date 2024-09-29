using BE.src.Services;
using Microsoft.AspNetCore.Mvc;


namespace BE.src.Controllers
{
    [ApiController]
    [Route("service/")]
    public class AmentityServiceController : ControllerBase
    {
        private readonly IAmenityServiceService _amenityServiceServ;
        public AmentityServiceController(IAmenityServiceService amenityServiceServ)
        {
            _amenityServiceServ = amenityServiceServ;
        }
        [HttpGet("view-services")]
        public async Task<IActionResult> ViewServices()
        {
            return await _amenityServiceServ.GetAllServices();
        }
    }
}