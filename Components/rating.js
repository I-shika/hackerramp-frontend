import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';

const RatingStars = ({ id, usern }) => {
  const [rating, setRating] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/diva/getrating/', {
          params: {
            id: id,
            username: localStorage.getItem('userId'),
          }
        });
        const fetchedRating = response.data.rating; // Make sure backend returns rating in this field
        setRating(fetchedRating);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error fetching rating:', error);
        setIsLoaded(true);
      }
    };

    fetchRating();
  }, [id, usern]);

  const handleRate = async (ratingValue) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/diva/ratepost/', {
        id: id,
        username: localStorage.getItem('userId'),
        rating: ratingValue
      });
      console.log('API response:', response.data);
    } catch (error) {
      console.error('Error rating product:', error);
    }
  };

  const handleClick = (value) => {
    if (rating === value) {
      setRating(null);
      handleRate(0);
    } else {
      setRating(value);
      handleRate(value);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {[...Array(10)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleClick(ratingValue)}
              style={{ display: 'none' }}
            />
            <FaStar
              className="star"
              color={ratingValue <= rating ? '#F13AB1' : '#e4e5e9'}
              size={25}
              style={{ cursor: 'pointer' }}
            />
          </label>
        );
      })}
    </div>
  );
};

export default RatingStars;
