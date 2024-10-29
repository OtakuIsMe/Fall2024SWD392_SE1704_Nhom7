import React, { useContext, useEffect, useState, useCallback } from 'react';
import { AuthenContext } from '../../../../Components/AuthenContext';
import { NavLink } from 'react-router-dom';
import { Home, Favorite, Receipt, Book, ArrowBack, Favorite as FilledHeart } from '@mui/icons-material';
import './FavoriteList.css';
import { ApiGateway } from '../../../../Api/ApiGateway';

const FavoriteList = () => {
  const context = useContext(AuthenContext);
  if (!context) {
    throw new Error("useAuthenContext must be used within an AuthenProvider");
  }

  const { user } = context;
  const [favoriteRooms, setFavoriteRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm lấy danh sách phòng yêu thích, sử dụng useCallback để tránh tạo lại hàm không cần thiết
  const fetchFavoriteRooms = useCallback(async () => {
    if (user && user.id) {
      try {
        const response = await ApiGateway.GetFavoriteRooms<any>(user.id);
        setFavoriteRooms(response);
      } catch (error) {
        console.error("Error fetching favorite rooms:", error);
        setError('Failed to load favorite rooms.');
        setFavoriteRooms([]);
      } finally {
        setLoading(false);
      }
    }
  }, [user?.id]); // Phụ thuộc vào user.id

  // Hàm xóa phòng khỏi danh sách yêu thích
  const unfavoriteRoom = useCallback(async (roomId) => {
    if (user && user.id) {
      try {
        await ApiGateway.UnfavoriteRoom<any>(user.id, roomId);
        await fetchFavoriteRooms();
      } catch (error) {
        console.error("Error unfavoriting room:", error);
      }
    }
  }, [user?.id, fetchFavoriteRooms]);

  useEffect(() => {
    if (user && user.id) {
      fetchFavoriteRooms();
    }
  }, [user?.id, fetchFavoriteRooms]); // Chỉ gọi lại khi user.id thay đổi hoặc fetchFavoriteRooms thay đổi

  const handleToggleFavorite = async (roomId: any) => {
    await unfavoriteRoom(roomId);
  };

  if (loading) return <div>Đang tải danh sách phòng yêu thích...</div>;
  if (error) return <div>{error}</div>;

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
      <div className="favorite-list">
        <h2>Your Favorite Rooms</h2>
        {favoriteRooms.length === 0 ? (
          <p>You have no favorite rooms.</p>
        ) : (
          <ul className="room-list">
            {favoriteRooms.map(room => (
              <li key={room.id} className="room-item">
                <div className="image-container">
                  {room.images && room.images.length > 0 && (
                    <img src={room.images[0].url} alt={room.name} className="room-image" />
                  )}
                  <FilledHeart className="heart-icon" onClick={() => handleToggleFavorite(room.id)} />
                </div>
                <div className="room-details">
                  <h3>{room.name}</h3>
                  <p><strong>Type:</strong> {room.typeRoom}</p>
                  <p><strong>Price:</strong> {room.price} VND</p>
                  <p><strong>Description:</strong> {room.description}</p>
                  <p><strong>Status:</strong> {room.status ? 'Available' : 'Unavailable'}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FavoriteList;
