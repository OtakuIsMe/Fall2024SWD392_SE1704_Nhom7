using BE.src.Domains.Models;
using BE.src.Repositories;
using BE.src.Shared.Type;
using Microsoft.AspNetCore.Mvc;
using BE.src.Util;
using BE.src.Domains.DTOs.User;
using System.IdentityModel.Tokens.Jwt;
using BE.src.Shared.Constant;
using BE.src.Domains.Enum;

namespace BE.src.Services
{
    public interface IUserServ
    {
        Task<IActionResult> LoginByDefault(LoginRqDTO data);
        Task<IActionResult> GetUserByToken(string token);
        Task<IActionResult> RegisterUser(RegisterRqDTO data);
        Task<IActionResult> ResetPassword(ResetPassRqDTO data);
        Task<IActionResult> ViewProfileByUserId(Guid userId);
        Task<IActionResult> GetListUserCustomer();
        Task<IActionResult> UpdateUserProfile(UpdateProfileDTO data);
        Task<IActionResult> ViewNotification(Guid userId);
        Task<IActionResult> AddFeedback(Guid userId, Guid roomId, AddFeedBackDTO data);
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
            catch (Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }
        public async Task<IActionResult> GetUserByToken(string token)
        {
            try
            {
                if (token == null)
                {
                    return ErrorResp.BadRequest("Token is null");
                }

                Guid? userId = Utils.GetUserIdByJWT(token);

                if (userId == null)
                {
                    return ErrorResp.BadRequest("Token is invalid");
                }

                User? user = await _userRepo.GetUserById(userId.Value);

                if (user == null)
                {
                    return ErrorResp.NotFound("User is not found");
                }

                return SuccessResp.Ok(user);
            }
            catch (Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }

        public async Task<IActionResult> RegisterUser(RegisterRqDTO data)
        {
            try
            {
                if ((await _userRepo.GetUserByEmail(data.Email)) != null)
                {
                    return ErrorResp.BadRequest("This email is already registered");
                }
                else if ((await _userRepo.GetUserByUsername(data.Username)) != null)
                {
                    return ErrorResp.BadRequest("This username is already registered");
                }
                else
                {
                    Role? userRole = await _userRepo.GetRoleByName(RoleEnum.Customer);
                    if (userRole == null)
                    {
                        return ErrorResp.NotFound("Can't find customrer role");
                    }
                    var user = new User
                    {
                        Username = data.Username,
                        Email = data.Email,
                        Phone = data.Phone,
                        Password = Utils.HashObject<string>(data.Password),
                        Wallet = 0,
                        Role = userRole
                    };
                    var isCreated = await _userRepo.CreateUser(user);
                    if (isCreated)
                    {
                        return SuccessResp.Created("Create user success");
                    }
                    else
                    {
                        return ErrorResp.BadRequest("Fail to create user");
                    }
                }
            }
            catch (Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }

        public async Task<IActionResult> ResetPassword(ResetPassRqDTO data)
        {
            try
            {
                User? user = await _userRepo.GetUserById(data.UserId);
                if (user == null)
                {
                    return ErrorResp.NotFound("Not found this user");
                }
                if (user.Password != Utils.HashObject<string>(data.OldPassword))
                {
                    return ErrorResp.BadRequest("Old Password is not correct");
                }
                else
                {
                    user.Password = Utils.HashObject<string>(data.NewPassword);
                    user.UpdateAt = DateTime.UtcNow;
                    bool isUpdated = await _userRepo.UpdateUser(user);
                    if (isUpdated)
                    {
                        return SuccessResp.Ok("Change Password successfully");
                    }
                    else
                    {
                        return ErrorResp.BadRequest("Fail to update user");
                    }
                }
            }
            catch (Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }

        public async Task<IActionResult> ViewProfileByUserId(Guid userId)
        {
            try
            {
                var user = await _userRepo.ViewProfileByUserId(userId);
                if (user == null)
                {
                    return ErrorResp.NotFound("Not found this user");
                }
                return SuccessResp.Ok(user);
            }
            catch (Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }


        public async Task<IActionResult> GetListUserCustomer()
        {
            try
            {
                var users = await _userRepo.GetListUserCustomer();
                return SuccessResp.Ok(users);
            }
            catch (System.Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }

        public async Task<IActionResult> UpdateUserProfile(UpdateProfileDTO data)
        {
            try
            {
                var user = await _userRepo.GetUserById(data.UserId);
                if (user == null)
                {
                    return ErrorResp.BadRequest("Cant find user");
                }
                string? userImageUrl = await Utils.UploadImgToFirebase(data.Image, data.Username, "User");
                if (userImageUrl == null)
                {
                    return ErrorResp.BadRequest("Cant get link image");
                }
                if (user.Image == null)
                {
                    Image image = new()
                    {
                        Url = userImageUrl,
                        UserId = user.Id
                    };
                    bool isCreatedImage = await _userRepo.CreateImageUser(image);
                }
                else
                {
                    Image image = user.Image;
                    image.Url = userImageUrl;
                    bool isUpdateImage = await _userRepo.UpdateImageUser(image);
                }

                user.Name = data.Name;
                user.Phone = data.Phone;
                user.Username = data.Username;
                user.DOB = data.DOB;
                bool isUpdatedUser = await _userRepo.UpdateUser(user);
                if (isUpdatedUser)
                {
                    return SuccessResp.Ok("UpdateSuccess");
                }
                else
                {
                    return ErrorResp.BadRequest("Update fail");
                }
            }
            catch (System.Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }
        public async Task<IActionResult> ViewNotification(Guid userId)
        {
            try
            {
                var notifications = await _userRepo.ViewNotification(userId);
                return SuccessResp.Ok(notifications);
            }
            catch (System.Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }

        public async Task<IActionResult> AddFeedback(Guid userId, Guid roomId, AddFeedBackDTO data)
        {
            try
            {
                RatingFeedback ratingFeedback = new()
                {
                    UserId = userId,
                    RoomId = roomId,
                    Feedback = data.Feedback,
                    RatingStar = data.RatingStar
                };
                var IsAddded = await _userRepo.AddFeedback(ratingFeedback);
                if (!IsAddded)
                {
                    return ErrorResp.BadRequest("Fail to Add Feedback");
                }
                return SuccessResp.Created("Add rating feedback successfull");
            }
            catch (System.Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }
    }
}