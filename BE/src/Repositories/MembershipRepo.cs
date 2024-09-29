using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BE.src.Domains.Database;
using BE.src.Domains.DTOs;
using BE.src.Domains.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.src.Repositories
{
    public interface IMembershipRepo
    {
        Task<MembershipDto?> GetMembershipDetails(Guid membershipId);
    }

    public class MembershipRepo : IMembershipRepo
    {
        private readonly PodDbContext _context;
        public MembershipRepo(PodDbContext context)
        {
            _context = context;
        }
        public async Task<MembershipDto?> GetMembershipDetails(Guid membershipId)
        {
            return await _context.Memberships
                .Where(m => m.Id == membershipId)
                .Select(m => new MembershipDto
                {
                    Name = m.Name,
                    Rank = m.Rank,
                    Discount = m.Discount,
                    Price = m.Price
                })
                .FirstOrDefaultAsync();
        }
    }
}