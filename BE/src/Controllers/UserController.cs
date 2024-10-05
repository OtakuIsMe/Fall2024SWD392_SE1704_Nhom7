using BE.src.Domains.Database;
using BE.src.Domains.DTOs.User;
using BE.src.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Bcpg;

namespace BE.src.Controllers
{
    [ApiController]
    [Route("user/")]
    public class UserController : ControllerBase
    {
        private readonly IUserServ _userServ;
        public UserController(IUserServ userServ)
        {
            _userServ = userServ;
        }

        [HttpPost("LoginDefault")]
        public async Task<IActionResult> LoginByDefault([FromBody] LoginRqDTO data)
        {
            return await _userServ.LoginByDefault(data);
        }

        [HttpPost("GetUserByToken")]
        public async Task<IActionResult> GetUserByToken([FromBody] string token)
        {
            return await _userServ.GetUserByToken(token);
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterRqDTO data)
        {
            return await _userServ.RegisterUser(data);
        }

        [HttpPut("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPassRqDTO data)
        {
            return await _userServ.ResetPassword(data);
        }
        [HttpGet("AutoGenerate")]
        public async Task<IActionResult> Generate()
        {
            var newId = Guid.NewGuid();
            return Ok(new { id = newId });
        }
    }
}