using BE.src.Domains.Database;
using BE.src.Domains.DTOs.User;
using BE.src.Domains.Enum;
using BE.src.Domains.Models;
using BE.src.Util;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.Mozilla;

namespace BE.src.Repositories
{
    public interface IUserRepo
    {
        Task<User?> GetUserByLogin(LoginRqDTO data);
        Task<User?> GetUserById(Guid userId);
        Task<User?> GetUserByEmail(string email);
        Task<User?> GetUserByUsername(string username);
        Task<bool> CreateUser(User user);
        Task<Role?> GetRoleByName(RoleEnum name);
        Task<bool> UpdateUser(User user);
        Task<User?> ViewProfileByUserId(Guid userId);
        Task<Membership?> GetMemberShipByUserId(Guid userId);
        Task<List<User>> GetListUserCustomer();
        Task<bool> CreateImageUser(Image image);
        Task<bool> UpdateImageUser(Image image);
        Task<int> CountAllUser();
    }
    public class UserRepo : IUserRepo
    {
        private readonly PodDbContext _context;
        public UserRepo(PodDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetUserByLogin(LoginRqDTO data)
        {
            return await _context.Users.FirstOrDefaultAsync(u => (u.Email == data.Email || u.Username == data.Email) && u.Password == Utils.HashObject<string>(data.Password));
        }

        public async Task<User?> GetUserById(Guid userId)
        {
            return await _context.Users
                                    .Include(u => u.Image)
                                    .FirstOrDefaultAsync(u => u.Id == userId);
        }

        public async Task<User?> GetUserByEmail(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User?> GetUserByUsername(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        }
        public async Task<bool> CreateUser(User user)
        {
            _context.Users.Add(user);
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<Role?> GetRoleByName(RoleEnum name)
        {
            return await _context.Roles.FirstOrDefaultAsync(u => u.Name == name);
        }
        public async Task<bool> UpdateUser(User user)
        {
            _context.Users.Update(user);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> CreateImageUser(Image image)
        {
            _context.Images.Add(image);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateImageUser(Image image)
        {
            _context.Images.Update(image);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<User?> ViewProfileByUserId(Guid userId)
        {
            return await _context.Users.Where(u => u.Id == userId)
                                        .Include(u => u.MembershipUsers)
                                            .ThenInclude(mu => mu.Membership)
                                        .Include(u => u.Image)
                                        .FirstOrDefaultAsync();
        }


        public async Task<Membership?> GetMemberShipByUserId(Guid userId)
        {
            return (await _context.MembershipUsers.Where(u => u.UserId == userId && u.Status)
                                                .Include(mu => mu.Membership).FirstOrDefaultAsync())?.Membership;
        }

        public async Task<List<User>> GetListUserCustomer()
        {
            return await _context.Users.Where(u => u.Role.Name == RoleEnum.Customer).ToListAsync();
        }

        public async Task<int> CountAllUser()
        {
            return await _context.Users.Where(u => u.Status == UserStatusEnum.Nornaml).CountAsync();
        }
    }
}