// AreaDetails.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { locations } from './data';
import { Location } from './types';
import './AreaDetail.css'
const AreaDetails = () => {
  const { locationId } = useParams<{ locationId: string }>();
  console.log("Location ID:", locationId); // Kiểm tra giá trị của locationId
  const location = locations.find((loc: Location) => loc.id === locationId);
  console.log("Location Data:", location); // Kiểm tra giá trị tìm được

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
      </div>
    ))}
  </div>
</div>

  );
};

export default AreaDetails;
