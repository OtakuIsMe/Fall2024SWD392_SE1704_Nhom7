import React from 'react';

const UserPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}'); // Truy xuất thông tin người dùng

  return (
    <div>
      <h1>Welcome to the User Page</h1>
      {user ? (
        <div>
          <p>Username: {user.email}</p> {/* Thay 'email' bằng các trường thông tin thích hợp */}
          {/* Thêm các trường thông tin khác nếu cần */}
        </div>
      ) : (
        <p>No user information available.</p>
      )}
    </div>
  );
};

export default UserPage;
