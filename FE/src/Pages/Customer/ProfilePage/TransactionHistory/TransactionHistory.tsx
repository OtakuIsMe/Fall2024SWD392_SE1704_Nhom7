import React, { useEffect, useState, useContext } from 'react';
import { AuthenContext } from '../../../../Components/AuthenContext';
import { ApiGateway } from '../../../../Api/ApiGateway';
import Sidebar from '../../../../Components/Sidebar/Sidebar'; // Thêm Sidebar để giữ sự đồng nhất
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
    setSelectedTransaction(transaction);
  };

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
                  <p>In process...</p>
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
