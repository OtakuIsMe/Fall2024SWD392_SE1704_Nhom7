using BE.src.Domains.DTOs;
using BE.src.Domains.Models;
using BE.src.Repositories;
using BE.src.Shared.Type;
using Microsoft.AspNetCore.Mvc;
using BE.src.Util;

namespace BE.src.Services
{
    public interface IUserServ
    {
        Task<IActionResult> LoginByDefault(LoginRqDTO data);
        // Task<IActionResult> GetUserByToken(string token);
    }
    public class UserServ : IUserServ
    {
        private readonly IUserRepo _userRepo;

        public UserServ(IUserRepo userRepo)
        {
            _userRepo = userRepo;
        }

        public async Task<IActionResult> LoginByDefault(LoginRqDTO data)
        {
            User? user = await _userRepo.GetUserByLogin(data);
            if (user == null)
            {
                return ErrorResp.NotFound("Not found user");
            }
            else
            {
                var returnValue = new LoginRpDTO
                {
                    Token = Utils.GenerateJwtToken(user)
                };
                return SuccessResp.Ok(returnValue);
            }
        }
        // public async Task<IActionResult> GetUserByToken(string token)
        // {

        // }
    }
}