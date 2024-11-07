import React, { useEffect, useState, useContext, useCallback } from 'react';
import { AuthenContext } from '../../../../Components/AuthenContext';
import { ApiGateway } from '../../../../Api/ApiGateway';
import Sidebar from '../../../../Components/Sidebar/Sidebar';
import './TransactionHistory.css';

const TransactionHistory = () => {
  const context = useContext(AuthenContext);
  if (!context) {
    throw new Error("AuthenContext must be used within an AuthenProvider");
  }

  const { user } = context;
  const [transactions, setTransactions] = useState<any[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const fetchTransactionHistory = async () => {
    try {
      const response = await ApiGateway.GetTransactionHistory(user.id);
      setTransactions(response);
    } catch (error) {
      console.error('Error fetching transaction history:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTransactionHistory();
    }
  }, [user]);

  const handleTransactionClick = (transaction: any) => {
    console.log(transaction)
    setSelectedTransaction(transaction);
  };

  // Hàm để hủy đặt phòng
  const cancelBooking = useCallback(async (bookingId: string) => {
    try {
      console.log(bookingId)
      await ApiGateway.CancelBookingByCustomer(bookingId);
      alert("Booking has been cancelled successfully.");
      await fetchTransactionHistory(); // Cập nhật lại lịch sử giao dịch
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  }, [fetchTransactionHistory]);

  // Hàm để hủy dịch vụ
  const cancelService = useCallback(async (bookingId: string, bookingItems: { bookingItemId: string, amount: number }[]) => {
    try {
      await ApiGateway.CancelServiceByCustomer(bookingId, bookingItems);
      alert("Service has been cancelled successfully.");
      await fetchTransactionHistory(); // Cập nhật lại lịch sử giao dịch
    } catch (error) {
      console.error("Error cancelling service:", error);
    }
  }, [fetchTransactionHistory]);

  return (
    <div className="profile-container">
      <Sidebar />
      <div className="transaction-history-content">
        <div className="transaction-layout">
          <div className="transaction-list">
            <h2>Pending Execution</h2>
            {transactions.filter(t => !t.status).length === 0 ? (
              <p className="transaction-empty">No pending transactions</p>
            ) : (
              transactions.filter(t => !t.status).map((transaction, index) => (
                <div
                  key={index}
                  className={`transaction-item ${selectedTransaction === transaction ? 'active' : ''}`}
                  onClick={() => handleTransactionClick(transaction)}
                >
                  <p>{transaction.transactionType === 1 ? 'Mua hàng' : 'Hoàn tiền'}</p>
                  <p>{transaction.total} VND</p>
                </div>
              ))
            )}

            <h2>Completed</h2>
            {transactions.filter(t => t.status).length === 0 ? (
              <p className="transaction-empty">No completed transactions</p>
            ) : (
              transactions.filter(t => t.status).map((transaction, index) => (
                <div
                  key={index}
                  className={`transaction-item ${selectedTransaction === transaction ? 'active' : ''}`}
                  onClick={() => handleTransactionClick(transaction)}
                >
                  <p>{transaction.transactionType === 1 ? 'Mua hàng' : 'Hoàn tiền'}</p>
                  <p>{transaction.total} VND</p>
                  <p>{transaction.status ? 'Thành công' : 'Thất bại'}</p>
                </div>
              ))
            )}
          </div>

          <div className="transaction-details">
            {selectedTransaction ? (
              <div className="transaction-detail-box">
                <h3>Transaction Details</h3>
                <p><strong>Payment Refund:</strong> {selectedTransaction.paymentRefund?.TxHash}</p>
                <p><strong>Status:</strong> {selectedTransaction.status ? 'Completed' : 'Pending'}</p>
                <p><strong>Amount:</strong> {selectedTransaction.total} VND</p>
                <p><strong>Date:</strong> {new Date(selectedTransaction.createAt).toLocaleDateString()}</p>

                {/* Nút hủy đặt phòng */}
                <button onClick={() => cancelBooking(selectedTransaction.id)}>
                  Cancel Booking
                </button>

                {/* Nút hủy dịch vụ */}
                <button onClick={() => cancelService(selectedTransaction.bookingId, [{ bookingItemId: selectedTransaction.bookingItemId, amount: 0 }])}>
                  Cancel Service
                </button>
              </div>
            ) : (
              <p className="transaction-placeholder">Select a transaction to view details</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
