using BE.src.Domains.Models;
using BE.src.Repositories;
using BE.src.Shared.Type;
using Microsoft.AspNetCore.Mvc;
using BE.src.Util;
using BE.src.Domains.DTOs.User;
using System.IdentityModel.Tokens.Jwt;
using BE.src.Shared.Constant;

namespace BE.src.Services
{
    public interface IUserServ
    {
        Task<IActionResult> LoginByDefault(LoginRqDTO data);
        Task<IActionResult> GetUserByToken(string token);
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
            try
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
            catch (Exception ex) {
                return ErrorResp.BadRequest(ex.Message);
            }
        }
        public async Task<IActionResult> GetUserByToken(string token)
        {
            try
            {
                if (token == null) {
                    return ErrorResp.BadRequest("Token is null");
                }

                Guid? userId = Utils.GetUserIdByJWT(token);

                if (userId == null) {
                    return ErrorResp.BadRequest("Token is invalid");
                }

                User? user = await _userRepo.GetUserById(userId.Value);

                if (user == null) {
                    return ErrorResp.NotFound("User is not found");
                }

                return SuccessResp.Ok(user);
            }
            catch (Exception ex) {
                return ErrorResp.BadRequest(ex.Message);
            }
        }
    }
}