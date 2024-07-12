import React, { useState, useEffect } from 'react';
import axios from 'axios';


const WishlistButton = ({ id, username }) => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        const fetchWishlistStatus = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/diva/wishlist/status/', {
              params: { id, username }
            });
            console(response.data.message)
            if (response.data.message) {
              setWishlistItems((prevItems) => [...prevItems, id]);
              setIsLoaded(true);
            }
          } catch (error) {
            console.error('Error fetching wishlist status:', error);
            setIsLoaded(true);
          }
        };
    
        fetchWishlistStatus();
      }, [id, username]);

    const handleAddWishlist = async () => {
        try {
          const response = await axios.post('http://127.0.0.1:8000/diva/wishlist/', {
            id,
            username,
          });
          console.log('API response:', response.data);
          if (wishlistItems.includes(id)) {
            // If already in wishlist, remove it
            setWishlistItems(wishlistItems.filter(itemId => itemId !== id));
          } else {
            // If not in wishlist, add it
            setWishlistItems([...wishlistItems, id]);
          }
        } catch (error) {
          console.error('Error updating wishlist:', error);
          // Handle error state or display an error message
        }
      };

      return (
        <button onClick={handleAddWishlist}>
          {wishlistItems.includes(id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </button>
      );
    };
    
    export default WishlistButton;