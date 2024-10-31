using BE.src.Domains.Models;
using BE.src.Domains.Database;
using Microsoft.EntityFrameworkCore;

namespace BE.src.Repositories
{
    public interface ITransactionRepo
    {
        Task<List<Transaction>> GetTransactions(Guid userId);
        Task<bool> CreatePaymentRefund(PaymentRefund paymentRefund);
        Task<bool> CreateTransaction(Transaction transaction);
        Task<List<Transaction>> TransactionInYear(int year);
        Task<Membership?> GetMembership(Guid id);

    }

    public class TrasactionRepo : ITransactionRepo
    {
        private readonly PodDbContext _context;

        public TrasactionRepo(PodDbContext context)
        {
            _context = context;
        }

        public async Task<bool> CreatePaymentRefund(PaymentRefund paymentRefund)
        {
            _context.PaymentRefunds.Add(paymentRefund);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> CreateTransaction(Transaction transaction)
        {
            _context.Transactions.Add(transaction);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Membership?> GetMembership(Guid id)
        {
            return await _context.Memberships.FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<List<Transaction>> GetTransactions(Guid userId)
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

        public async Task<List<Transaction>> TransactionInYear(int year)
        {
            return await _context.Transactions.Where(t => t.CreateAt.HasValue && t.CreateAt.Value.Year == year).ToListAsync();
        }
    }
}