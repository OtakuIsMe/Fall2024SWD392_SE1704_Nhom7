using BE.src.Domains.Database;
using BE.src.Domains.DTOs.User;
using BE.src.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
    }
}