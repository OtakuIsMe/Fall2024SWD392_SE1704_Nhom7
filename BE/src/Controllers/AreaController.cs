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

        public AreaController (IAreaServ areaServ)
        {
            _areaServ = areaServ;
        }

        [HttpPost("create")]
        public Task<IActionResult> CreateArea([FromForm] CreateAreaReqDTO data)
        {
            return _areaServ.CreateArea(data);
        }
    }
}