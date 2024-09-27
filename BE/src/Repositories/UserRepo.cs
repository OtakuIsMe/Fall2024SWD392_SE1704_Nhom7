using BE.src.Domains.Database;
using BE.src.Domains.DTOs.User;
using BE.src.Domains.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.src.Repositories
{
    public interface IUserRepo
    {
        Task<User?> GetUserByLogin(LoginRqDTO data);
        Task<User?> GetUserById(Guid userId);
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
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == data.Email && u.Password == data.Password);
        }

        public async Task<User?> GetUserById(Guid userId)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        }
    }
}