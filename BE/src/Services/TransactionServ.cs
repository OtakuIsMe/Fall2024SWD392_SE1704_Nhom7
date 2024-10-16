using BE.src.Domains.DTOs.Transaction;
using MyTransaction = BE.src.Domains.Models.Transaction;
using System.Transactions;
using BE.src.Repositories;
using BE.src.Shared.Constant;
using BE.src.Shared.Type;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using PayPal.Api;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using BE.src.Domains.Models;
using PaypalTransaction = PayPal.Api.Transaction;
using MyTrasaction = BE.src.Domains.Models.Transaction;

using BE.src.Domains.Enum;
using BE.src.Shared.Type;
using Microsoft.AspNetCore.Mvc;

namespace BE.src.Services
{
    public interface ITransactionServ
    {
        Task<IActionResult> TransactionHistory(Guid userId);
        Task<IActionResult> PaymentByPaypal(PaymentPayPalDto data);
        Task<IActionResult> PaymentPaypalSuccess(Guid bookingId);
        Task<IActionResult> PaymentByCod(Guid bookingId);        
    }

    public class TrasactionServ : ITransactionServ
    {
        private readonly ITransactionRepo _transactionRepo;
        private readonly IBookingRepo _bookingRepo;
        private readonly IUserRepo _userRepo;
        public TrasactionServ(ITransactionRepo transactionRepo, IBookingRepo bookingRepo, IUserRepo userRepo)
        {
            _transactionRepo = transactionRepo;
            _bookingRepo = bookingRepo;
            _userRepo = userRepo;
        }

        private APIContext GetAPIContext()
        {
            var clientId = Paypal.ClientId;
            var clientSecret = Paypal.Secret;
            var accessToken = new OAuthTokenCredential(clientId, clientSecret).GetAccessToken();
            return new APIContext(accessToken) { Config = new Dictionary<string, string> { { "mode", Paypal.Mod } } };
        }

        private Payment CreatePayment(float total, string returnUrl, string cancelUrl)
        {
            var apiContext = GetAPIContext();

            decimal newTotal = Math.Round((decimal)total / 24850, 2);
            Console.WriteLine(newTotal);

            var payment = new Payment
            {
                intent = "sale",
                payer = new Payer { payment_method = "paypal" },
                redirect_urls = new RedirectUrls
                {
                    cancel_url = cancelUrl,
                    return_url = returnUrl
                },
                transactions = new List<PaypalTransaction>
                {
                    new PaypalTransaction
                    {
                        description = "Transaction description",
                        invoice_number = Guid.NewGuid().ToString(),
                        amount = new Amount
                        {
                            currency = "USD",
                            total = newTotal.ToString("F2")
                        }
                    }
                }
            };

            return payment.Create(apiContext);
        }

        public async Task<IActionResult> PaymentByPaypal(PaymentPayPalDto data)
        {
            try
            {
                var booking = await _bookingRepo.GetBookingById(data.BookingId);
                Console.WriteLine(booking);
                if (booking == null)
                {
                    return ErrorResp.NotFound("Cant find booking");
                }
                string return_url = $"http://localhost:5101/transaction/Payment-PayPal-Success?bookingId={data.BookingId}";
                string cancel_url = "http://localhost:5173/";
                var payment = CreatePayment(booking.Total, return_url, cancel_url);
                var approvalUrl = payment.links.FirstOrDefault(lnk => lnk.rel.Equals("approval_url", StringComparison.OrdinalIgnoreCase))?.href;
                return SuccessResp.Ok(approvalUrl);
            }
            catch (System.Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }

        public async Task<IActionResult> TransactionHistory(Guid userId)
        {
            try
            {
                List<MyTransaction> transactions = await _transactionRepo.GetTransactions(userId);
                return SuccessResp.Ok(transactions);
            }
            catch (System.Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }

        public async Task<IActionResult> PaymentPaypalSuccess(Guid bookingId)
        {
            try
            {
                var booking = await _bookingRepo.GetBookingById(bookingId);
                if (booking == null)
                {
                    return ErrorResp.NotFound("Cant find booking");
                }
                booking.IsPay = true;
                bool isUpdateBooking = await _bookingRepo.UpdateBooking(booking);
                if (!isUpdateBooking)
                {
                    return ErrorResp.BadRequest("Cant update booking");
                }
                PaymentRefund payment = new()
                {
                    Type = PaymentRefundEnum.Payment,
                    Total = booking.Total,
                    PointBonus = 0,
                    BookingId = bookingId,
                    PaymentType = PaymentTypeEnum.Paypal,
                    Satutus = true
                };
                bool isCreatedPayment = await _transactionRepo.CreatePaymentRefund(payment);
                if (!isCreatedPayment)
                {
                    return ErrorResp.BadRequest("Cant create payment");
                }
                MyTransaction transaction = new()
                {
                    TransactionType = TypeTransactionEnum.Payment,
                    Total = booking.Total,
                    PaymentRefund = payment,
                    UserId = booking.UserId
                };
                bool isCreatedTrasaction = await _transactionRepo.CreateTransaction(transaction);
                if (!isCreatedTrasaction)
                {
                    return ErrorResp.BadRequest("Cant create transaction");
                }
                return SuccessResp.Redirect("http://localhost:5173/");
            }
            catch (System.Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }

        public async Task<IActionResult> PaymentByCod(Guid bookingId)
        {
            try
            {
                var booking = await _bookingRepo.GetBookingById(bookingId);
                if (booking == null)
                {
                    return ErrorResp.NotFound("Cant find booking");
                }
                booking.IsPay = true;
                bool isUpdateBooking = await _bookingRepo.UpdateBooking(booking);
                if (!isUpdateBooking)
                {
                    return ErrorResp.BadRequest("Cant update booking");
                }
                PaymentRefund payment = new()
                {
                    Type = PaymentRefundEnum.Payment,
                    Total = booking.Total,
                    PointBonus = 0,
                    BookingId = bookingId,
                    PaymentType = PaymentTypeEnum.COD,
                    Satutus = false
                };
                bool isCreatedPayment = await _transactionRepo.CreatePaymentRefund(payment);
                if (!isCreatedPayment)
                {
                    return ErrorResp.BadRequest("Cant create payment");
                }
                MyTransaction transaction = new()
                {
                    TransactionType = TypeTransactionEnum.Payment,
                    Total = booking.Total,
                    PaymentRefund = payment,
                    UserId = booking.UserId
                };
                bool isCreatedTrasaction = await _transactionRepo.CreateTransaction(transaction);
                if (!isCreatedTrasaction)
                {
                    return ErrorResp.BadRequest("Cant create transaction");
                }
                return SuccessResp.Ok("Payment cod done");
            }
            catch (System.Exception ex)
            {
                return ErrorResp.BadRequest(ex.Message);
            }
        }
    }
}