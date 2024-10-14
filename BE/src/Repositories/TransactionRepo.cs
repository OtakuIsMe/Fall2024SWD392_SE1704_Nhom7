using BE.src.Domains.Database;

namespace BE.src.Repositories
{
    public interface ITransactionRepo
    {

    }

    public class TrasactionRepo : ITransactionRepo
    {
        private readonly PodDbContext _context;

        public TrasactionRepo(PodDbContext context)
        {
            _context = context;
        }
    }
}