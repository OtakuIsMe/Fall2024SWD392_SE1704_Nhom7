using BE.src.Repositories;

namespace BE.src.Services
{
    public interface ITransactionServ
    {

    }

    public class TrasactionServ : ITransactionServ
    {
        private readonly ITransactionRepo _transactionRepo;

        public TrasactionServ(ITransactionRepo transactionRepo)
        {
            _transactionRepo = transactionRepo;
        }
    }
}