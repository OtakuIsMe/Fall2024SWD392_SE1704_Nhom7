using BE.src.Domains.Models.Base;
using System;

namespace BE.src.Domains.Models
{
    public class DepositWithdraw : BaseEntity
    {
        public float Amount { get; set; }
        public string Type { get; set; } = null!;
        public string Method { get; set; } = null!;

        public Guid UserId { get; set; }
        public User User { get; set; } = null!;
        public Transaction Transaction { get; set; } = null!;
    }
}