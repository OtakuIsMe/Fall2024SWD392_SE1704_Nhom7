using BE.src.Domains.DTOs.Transaction;
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

        [HttpGet("History/{userId:Guid}")]
        public async Task<IActionResult> TransactionHistory(Guid userId)
        {
            return await _transactionServ.TransactionHistory(userId);
        }

        [HttpPost("payment-cod")]
        public async Task<IActionResult> PaymentByCod([FromBody] Guid bookingId)
        {
            return await _transactionServ.PaymentByCod(bookingId);
        }

        [HttpPost("Payment-PayPal-Create")]
        public async Task<IActionResult> PaymentByPayPal([FromBody] PaymentPayPalDto data)
        {
            return await _transactionServ.PaymentByPaypal(data);
        }

        [HttpGet("Payment-PayPal-Success")]
        public async Task<IActionResult> PaymentPaypalSuccess([FromQuery] Guid bookingId)
        {
            Console.WriteLine(bookingId);
            return await _transactionServ.PaymentPaypalSuccess(bookingId);
        }
        [HttpGet("Statistic-Month/{year: int}")]
        public async Task<IActionResult> StatisticMonthInYear(int year)
        {
            return await _transactionServ.StatisticMonthInYear(year);
        }

        // [HttpGet("Statistic-")]
    }
}