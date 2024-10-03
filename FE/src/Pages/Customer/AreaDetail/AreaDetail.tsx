// AreaDetails.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { locations } from './data';
import { Location } from './types';

const AreaDetails = () => {
  const { locationId } = useParams<{ locationId: string }>();
  console.log("Location ID:", locationId); // Kiểm tra giá trị của locationId
  const location = locations.find((loc: Location) => loc.id === locationId);
  console.log("Location Data:", location); // Kiểm tra giá trị tìm được

  if (!location) {
    return <div>Địa điểm không tồn tại.</div>;
  }

  return (
    <div>
      <h1>{location.name}</h1>
      <img src={location.imageUrl} alt={location.name} />
      <p>{location.description}</p>
      <div>
        {location.reviews.map((review, index) => (
          <div key={index}>
            <p>{review.user}: {review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AreaDetails;
