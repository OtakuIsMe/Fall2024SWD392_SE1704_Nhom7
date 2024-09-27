using BE.src.Domains.Database;
using BE.src.Domains.DTOs;
using BE.src.Domains.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.src.Repositories
{
    public interface IUserRepo
    {
        Task<User?> GetUserByLogin(LoginRqDTO data);
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
    }
}