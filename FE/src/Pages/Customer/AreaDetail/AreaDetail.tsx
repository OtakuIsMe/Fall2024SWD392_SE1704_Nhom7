import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { locations } from './data';
import { Location } from './types';
import Rating from '@mui/material/Rating';
import './AreaDetail.css';

const AreaDetails = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const location = locations.find((loc: Location) => loc.id === locationId);

  // Tạo state để lưu trữ ratings, sử dụng một đối tượng với các khóa là index
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // Khởi tạo giá trị ratings dựa trên số lượng đánh giá
    if (location) {
      const initialRatings: { [key: string]: number } = {};
      location.reviews.forEach((review, index) => {
        initialRatings[index] = review.rating || 0; // Giả sử mỗi review có trường `rating` hoặc mặc định là 0
      });
      setRatings(initialRatings);
    }
  }, [location]);

  const handleRatingChange = (index: string) => (event: React.ChangeEvent<{}>, newValue: number | null) => {
    setRatings(prev => ({
      ...prev,
      [index]: newValue || 0
    }));
  };

  if (!location) {
    return <div>Địa điểm không tồn tại.</div>;
  }

  return (
    <div className="area-details-container">
      <div className="header-image">
        <img src={location.imageUrl} alt={location.name} />
      </div>
      <div className="content-section">
        <h1>{location.name}</h1>
        <p>{location.description}</p>
      </div>
      <div className="reviews-section">
        <h2>Reviews</h2>
        {location.reviews.map((review, index) => (
          <div key={index} className="review">
            <strong>{review.user}</strong>
            <p>{review.comment}</p>
            <Rating
              name={`rating-${index}`}
              value={ratings[index]}
              onChange={handleRatingChange(index.toString())}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AreaDetails;
