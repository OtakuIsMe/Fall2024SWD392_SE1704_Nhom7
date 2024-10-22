import React, { useEffect, useState, useContext } from 'react';
import { AuthenContext } from '../../../../Components/AuthenContext';
import { TextField, Button, Avatar } from '@mui/material';
import { Home, Favorite, Receipt, Book, ArrowBack } from '@mui/icons-material';
import './Profile.css';

const Profile = () => {
  const context = useContext(AuthenContext);
  if (!context) {
    throw new Error("AuthenContext must be used within an AuthenProvider");
  }

  const { user, viewProfile, updateUserProfile } = context;
  
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
    <div className="profile-container">
      <div className="sidebar">
        <ul>
          <li><ArrowBack /> <a href="/">Back to Homepage</a></li> 
          <li><Home /> User info</li>
          <li><Favorite /> Favorites</li>
          <li><Receipt /> Transactions</li>
          <li><Book /> Pending Bookings</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="profile-header">
          <Avatar alt="User Avatar" src={userData.imageUrl} sx={{ width: 120, height: 120 }} className="avatar"/>
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginTop: '10px' }}
            />
          )}
          <div className="user-info">
            <h2>{userData.name}</h2>
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
            className="edit-btn"
          >
            {isEditing ? 'Hủy' : 'Chỉnh sửa'}
          </Button>
          {isEditing && (
            <Button type="submit" color="primary" variant="contained" className="save-btn">
              Lưu thay đổi
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;
