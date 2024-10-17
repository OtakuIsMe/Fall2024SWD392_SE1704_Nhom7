using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BE.src.Domains.Models;
using BE.src.Repositories;
using BE.src.Shared.Type;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace BE.src.Services
{
    public interface IMembershipServ
    {
        Task<IActionResult> GetMembershipDetailsAsync(Guid membershipId);
    }

    public class MembershipServ : IMembershipServ
    {
        private readonly IMembershipRepo _membershipRepo;
        public MembershipServ(IMembershipRepo membershipRepo)
        {
            _membershipRepo = membershipRepo;
        }
        public async Task<IActionResult> GetMembershipDetailsAsync(Guid membershipId)
        {
            var membership = await _membershipRepo.GetMembershipDetails(membershipId);

            if (membership == null)
            {
                return new NotFoundObjectResult(new { Message = "Membership not found" });
            }

            return new OkObjectResult(membership);
        }
    }
}