using BE.src.Domains.Database;
using BE.src.Domains.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.src.Repositories
{
    public interface ITransactionRepo
    {
        Task<List<Transaction>> ViewTransactionHistoryOfUser(Guid userId);
    }

    public class TrasactionRepo : ITransactionRepo
    {
        private readonly PodDbContext _context;

        public TrasactionRepo(PodDbContext context)
        {
            _context = context;
        }

        public async Task<List<Transaction>> ViewTransactionHistoryOfUser(Guid userId)
        {
            return await _context.Transactions.Where(t => t.UserId == userId)
                                            .Include(t => t.PaymentRefund)
                                                .ThenInclude(t => t.RefundItems)
                                                    .ThenInclude(ri => ri.BookingItem)
                                                        .ThenInclude(bi => bi.AmenityService)
                                            .Include(t => t.MembershipUser)
                                            .Include(t => t.User)
                                                .ThenInclude(u => u.Image)
                                            .Include(t => t.DepositWithdraw)
                                            .ToListAsync();
        }
    }
}