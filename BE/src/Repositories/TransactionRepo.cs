using BE.src.Domains.Models;
using BE.src.Domains.Database;
using BE.src.Domains.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.src.Repositories
{
    public interface ITransactionRepo
    {
        Task<List<Transaction>> GetTransactions(Guid userId);
        Task<bool> CreatePaymentRefund(PaymentRefund paymentRefund);
        Task<bool> CreateTransaction(Transaction transaction);        Task<List<Transaction>> ViewTransactionHistoryOfUser(Guid userId);
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

        public Task<List<Transaction>> GetTransactions(Guid userId)
        {
            throw new NotImplementedException();
        }
    }
}