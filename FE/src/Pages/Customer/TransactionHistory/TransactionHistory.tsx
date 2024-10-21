import React from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import './TransactionHistory.css'; // Import file CSS để tùy chỉnh giao diện nếu cần

const TransactionHistory = () => {
  // Tạo dữ liệu mẫu
  const transactions = [
    { id: 1, date: '05-10-2024 11:17', type: 'Mua hàng', amount: '-10.000', reason: 'Thanh toán cho đơn hàng ZVS3YX764Z' },
    { id: 2, date: '01-10-2024 02:44', type: 'Mua hàng', amount: '-79.000', reason: 'Thanh toán cho đơn hàng 8GP6R6MQW1' },
    { id: 3, date: '01-10-2024 02:06', type: 'Nạp tiền', amount: '88.000', reason: 'Nạp tiền từ ngân hàng VCB' },
    { id: 4, date: '23-07-2024 09:31', type: 'Mua hàng', amount: '-10.000', reason: 'Thanh toán cho đơn hàng TJYR7R3VJS' },
    { id: 5, date: '13-05-2024 15:08', type: 'Mua hàng', amount: '-10.000', reason: 'Thanh toán cho đơn hàng VCHBMXBDIQ' },
    // Thêm nhiều dữ liệu mẫu khác...
  ];

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h5" sx={{ marginBottom: '20px' }}>Lịch sử giao dịch</Typography>
      
      <Button variant="contained" color="primary" sx={{ marginBottom: '10px' }}>
        Lịch sử giao dịch
      </Button>
      <Button variant="contained" color="secondary" sx={{ marginLeft: '10px', marginBottom: '10px' }}>
        Rút tiền
      </Button>

      <TableContainer component={Paper}>
        <Table aria-label="transaction table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Ngày</strong></TableCell>
              <TableCell><strong>Loại</strong></TableCell>
              <TableCell><strong>Số tiền</strong></TableCell>
              <TableCell><strong>Lý do</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color={transaction.type === 'Mua hàng' ? 'warning' : 'success'}
                    size="small"
                  >
                    {transaction.type}
                  </Button>
                </TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.reason}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ marginTop: '20px', textAlign: 'right' }}>
        <Typography variant="h6">Tổng tiền tạm giữ: 0 VND</Typography>
      </Box>
    </Box>
  );
};

export default TransactionHistory;
