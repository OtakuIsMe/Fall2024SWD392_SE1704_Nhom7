import React, { useEffect, useState, useContext } from 'react';
import { AuthenContext } from '../../../../Components/AuthenContext';
import { ApiGateway } from '../../../../Api/ApiGateway';
import './TransactionHistory.css';
import { NavLink } from 'react-router-dom';
import { Home, Favorite, Receipt, Book, ArrowBack } from '@mui/icons-material';
import { Avatar } from '@mui/material';

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
      <div className="sidebar">
        <ul>
          <li>
            <NavLink to="/" className="sidebar-link">
              <ArrowBack /> Back to Homepage
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className="sidebar-link" activeClassName="active">
              <Home /> User info
            </NavLink>
          </li>
          <li>
            <NavLink to="/favorites" className="sidebar-link" activeClassName="active">
              <Favorite /> Favorites
            </NavLink>
          </li>
          <li>
            <NavLink to="/transaction-history" className="sidebar-link" activeClassName="active">
              <Receipt /> Transaction History
            </NavLink>
          </li>
          <li>
            <NavLink to="/pending-bookings" className="sidebar-link" activeClassName="active">
              <Book /> Pending Bookings
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="transaction-history-container">
        <div className="profile-header">
        <Avatar alt="User Avatar" src={user.imageUrl} sx={{ width: 120, height: 120 }} className="avatar" />
          <div className="user-info">
            <h2>{user.name}</h2>
            <p>Số dư ví: {user.wallet} VND</p>
          </div>
        </div>

        <div className="transaction-layout">
          <div className="transaction-left">
            <h2>Pending Execution</h2>
            {transactions.filter(t => !t.status).length === 0 ? (
              <p>No pending transactions</p>
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
              <p>No completed transactions</p>
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

          <div className="transaction-right">
            {selectedTransaction ? (
              <div className="transaction-details">
                <h3>Transaction Details</h3>
                
                <p>Status: {selectedTransaction.status ? 'Completed' : 'Pending'}</p>
                <p>Amount: {selectedTransaction.total} VND</p>
                <p>Date: {selectedTransaction.createAt}</p>
              </div>
            ) : (
              <p>Select a transaction to view details</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
