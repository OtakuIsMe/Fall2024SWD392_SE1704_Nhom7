using BE.src.Services;
using Microsoft.AspNetCore.Mvc;

namespace BE.src.Controllers
{
    [Route("transaction/")]
    [ApiController]

    public class TransactionController : ControllerBase
    {
        private readonly ITransactionServ _transactionServ;

        public TransactionController(ITransactionServ transactionServ)
        {
            _transactionServ = transactionServ;
        }

        [HttpGet("transaction-history")]
        public async Task<IActionResult> ViewTransactionHistory([FromBody] Guid userId)
        {
            return await _transactionServ.ViewTransactionHistory(userId);
        }

        // [HttpPost("payment-cod")]
        // public async Task<IActionResult> PaymentByCod([FromBody] Guid bookingId)
        // {

        // }
    }
}