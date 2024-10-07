using BE.src.Domains;
using BE.src.Domains.Database;
using BE.src.Domains.DTOs.User;
using BE.src.Services;
using BE.src.Util;
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
        public async Task<IActionResult> GetUserByToken([FromBody] GetUserByTokenRqDTO data)
        {
            return await _userServ.GetUserByToken(data.Token);
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
        [HttpPost("ConvertToHash")]
        public async Task<IActionResult> Convert([FromBody] string id)
        {
            var hashCode = Utils.HashObject<string>(id);
            return Ok(new { hashing = hashCode });
        }
        [HttpGet("ViewProfile")]
        public async Task<IActionResult> ViewProfile([FromBody] string userId)
        {
            return await _userServ.ViewProfileByUserId(Guid.Parse(userId));
        }
        [HttpPut("UpdateProfile")]
        public async Task<IActionResult> UpdateProfile(Guid userId, [FromBody] UpdateProfileDTO dto)
        {
            return await _userServ.UpdateProfile(userId, dto);
        }
    }
}