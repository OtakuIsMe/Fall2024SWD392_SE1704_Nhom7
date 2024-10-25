import React, { useContext, useEffect, useState } from 'react';
import { AuthenContext } from '../../../../Components/AuthenContext';
import { NavLink } from 'react-router-dom';
import { Home, Favorite, Receipt, Book, ArrowBack, Favorite as FilledHeart } from '@mui/icons-material';
import './FavoriteList.css';

const FavoriteList = () => {
  const context = useContext(AuthenContext);
  if (!context) {
    throw new Error("useAuthenContext must be used within an AuthenProvider");
  }

  const { user, fetchFavoriteRooms, unfavoriteRoom } = context;
  const [favoriteRooms, setFavoriteRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const rooms = await fetchFavoriteRooms();
        setFavoriteRooms(rooms);
      } catch (err) {
        setError('Failed to load favorite rooms.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, fetchFavoriteRooms]);

  const handleToggleFavorite = async (roomId: string) => {
    try {
      setLoading(true);
      await unfavoriteRoom(roomId);
      const updatedRooms = await fetchFavoriteRooms();
      setFavoriteRooms(updatedRooms);
    } catch (err) {
      setError('Failed to update favorite rooms.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading favorite rooms...</div>;
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
                    <img 
                      src={room.images[0].url} 
                      alt={room.name} 
                      className="room-image" 
                    />
                  )}
                  <FilledHeart 
                    className="heart-icon" 
                    onClick={() => handleToggleFavorite(room.id)}
                  />
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
