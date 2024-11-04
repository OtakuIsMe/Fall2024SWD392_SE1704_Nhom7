import React, { useEffect, useState, useContext } from 'react';
import { AuthenContext } from '../../../../Components/AuthenContext';
import { TextField, Button, Avatar } from '@mui/material';

import { NavLink } from 'react-router-dom';  // Use NavLink for page transitions
import './Profile.css';
import { ApiGateway } from '../../../../Api/ApiGateway';
import Sidebar from '../../../../Components/Sidebar/Sidebar';


const Profile = () => {
  const context = useContext(AuthenContext);
  if (!context) {
    throw new Error("AuthenContext must be used within an AuthenProvider");
  }

  const { user } = context;
  const viewProfile = async (): Promise<void> => {
    if (user && user.id) {
        try {
            const response = await ApiGateway.ViewProfile<any>({ userId: user.id });
            setUserData(response);
        } catch (error) {
            console.error("Lỗi khi lấy thông tin hồ sơ:", error);
        }
    }
};
  const updateUserProfile = async (userData: any): Promise<void> => {
    try {
        const updatedUser = {
            ...userData,
            userId: user.userId || user.id,
        };
        await ApiGateway.UpdateUserProfile(updatedUser);
        setUserData(updatedUser);
        alert("Profile updated successfully");
    } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile");
    }
};
  const [userData, setUserData] = useState({
    username: '',
    name: '',
    phone: '',
    dob: '',
    wallet: 0,
    imageUrl: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      await viewProfile();
    };
    fetchProfileData();
  }, [viewProfile]);

  useEffect(() => {
    if (user) {
      setUserData({
        username: user.username || '',
        name: user.name || '',
        phone: user.phone || '',
        dob: user.dob ? user.dob.substring(0, 10) : '',
        wallet: user.wallet || 0,
        imageUrl: user.image?.url || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setUserData((prevData) => ({
        ...prevData,
        imageUrl,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedData = {
      userId: user.id,
      name: userData.name,
      phone: userData.phone,
      dob: userData.dob,
      image: userData.imageUrl,
    };

    try {
      await updateUserProfile(updatedData);
      alert('Cập nhật thành công');
      setIsEditing(false);
    } catch (error) {
      console.error('Lỗi cập nhật:', error);
      alert('Cập nhật thất bại');
    }
  };

  return (
    <div className="profile-page-container">
    <Sidebar />
    <div className="profile-content">
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="profile-header">
          <Avatar alt="User Avatar" src={userData.imageUrl} className="profile-avatar" />
          <div className="profile-info">
            <h2>{userData.name || 'Tên người dùng'}</h2>
            <p>Số dư ví: {userData.wallet} VND</p>
          </div>
        </div>
  
        <div className="profile-input-grid">
          <TextField
            margin="dense"
            id="username"
            label="Tên người dùng"
            type="text"
            fullWidth
            value={userData.username}
            onChange={handleChange}
            name="username"
            disabled={!isEditing}
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="name"
            label="Tên đầy đủ"
            type="text"
            fullWidth
            value={userData.name}
            onChange={handleChange}
            name="name"
            disabled={!isEditing}
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="phone"
            label="Số điện thoại"
            type="text"
            fullWidth
            value={userData.phone}
            onChange={handleChange}
            name="phone"
            disabled={!isEditing}
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="dob"
            label="Ngày sinh"
            type="date"
            fullWidth
            value={userData.dob}
            onChange={handleChange}
            name="dob"
            disabled={!isEditing}
            variant="outlined"
          />
        </div>
  
        <div className="profile-btns">
          <Button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            color="primary"
            variant="contained"
            className="profile-edit-btn"
          >
            {isEditing ? 'Hủy' : 'Chỉnh sửa'}
          </Button>
          {isEditing && (
            <Button type="submit" color="primary" variant="contained" className="profile-save-btn">
              Lưu thay đổi
            </Button>
          )}
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default Profile;