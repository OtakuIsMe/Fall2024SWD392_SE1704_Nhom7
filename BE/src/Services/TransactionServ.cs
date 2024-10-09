using System.Transactions;
using BE.src.Repositories;
using BE.src.Shared.Type;
using Microsoft.AspNetCore.Mvc;

namespace BE.src.Services
{
    public interface ITransactionServ
    {
        Task<IActionResult> ViewTransactionHistory(Guid userId);
    }

    public class TrasactionServ : ITransactionServ
    {
        private readonly ITransactionRepo _transactionRepo;
        private readonly IUserRepo _userRepo;
        public TrasactionServ(ITransactionRepo transactionRepo, IUserRepo userRepo)
        {
            _transactionRepo = transactionRepo;
            _userRepo = userRepo;
        }

        public async Task<IActionResult> ViewTransactionHistory(Guid userId)
        {
            try
            {
                var user = await _userRepo.GetUserById(userId);
                if (user == null)
                {
                    return ErrorResp.NotFound("User not found");
                }
                return SuccessResp.Ok(await _transactionRepo.ViewTransactionHistoryOfUser(userId));
            }
            catch (Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }
    }
}