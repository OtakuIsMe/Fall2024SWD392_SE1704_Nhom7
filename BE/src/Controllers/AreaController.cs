using BE.src.Domains.Database;
using BE.src.Domains.DTOs.Area;
using BE.src.Domains.DTOs.User;
using BE.src.Services;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Bcpg;

namespace BE.src.Controllers
{
    [ApiController]
    [Route("area/")]
    public class AreaController : ControllerBase
    {
        private readonly IAreaServ _areaServ;

        public AreaController(IAreaServ areaServ)
        {
            _areaServ = areaServ;
        }

        [HttpPost("Create")]
        public Task<IActionResult> CreateArea([FromForm] CreateAreaRqDTO data)
        {
            Console.WriteLine($"{data.Latitude}, {data.Longitude}");
            return _areaServ.CreateArea(data);
        }
    }
}