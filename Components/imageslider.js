'use client';

import React, { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import axios from 'axios';

export default function Styling() {
  const [images, setImages] = useState([]);
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    mode: 'snap',
    slides: { perView: 1 },
    created: () => {
      console.log('Keen Slider created');
    },
    updated: () => {
      console.log('Keen Slider updated');
    },
  });

  useEffect(() => {
    console.log('useEffect called');
    const fetchPhotos = async () => {
      try {
        console.log('Fetching photos...');
        const response = await axios.get('http://127.0.0.1:8000/styling/photos/get/');
        console.log('Photos fetched:', response.data.data);
        
        // Extract URLs and create the images array
        const fetchedImages = response.data.data.flatMap(photo => 
          photo.photos.map(image => ({
            url: `http://localhost:8000${image.photo_url}`
          }))
        );
        
        setImages(fetchedImages);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, []);

  useEffect(() => {
    console.log('Images state updated:', images);
  }, [images]);

  return (
    <div ref={sliderRef} className="keen-slider">
      {images.length > 0 ? (
        images.map((image, index) => (
          <div key={index} className="keen-slider__slide">
            <img
              src={image.url}
              alt="Fetched Image"
              style={{ width: '80%', height: 'auto' }}
              className="border-8 border-black items-center border-dotted w-4/5 h-auto transform transition duration-300 group-hover:scale-105 group-hover:opacity-80"
            />
          </div>
        ))
      ) : (
        <div>No photos available</div>
      )}
    </div>
  );
}
