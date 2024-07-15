import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WishlistButton = ({ id, username }) => {
    const [isInWishlist, setIsInWishlist] = useState();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchWishlistStatus = async () => {
            console.log('wishlist api called')
            try {
                const response = await axios.get('http://127.0.0.1:8000/diva/wishlist/status/', {
                    params: { id, username }
                });
                  
                    setIsInWishlist(response.data.message);
                    console.log(response.data.message,"isinwish")
                
            } catch (error) {
                console.error('Error fetching wishlist status:', error);
            } finally {
                setIsLoaded(true);
            }
        };

        fetchWishlistStatus();
    }, [id, username]);

    const handleToggleWishlist = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/diva/wishlist/', {
                'id':id,
               'username':username,
            });
            if (response.data.message) {
                setIsInWishlist((prev) => !prev);
                await fetchWishlistStatus();
            } else {
                console.error('Error updating wishlist:', response.data.message);
            }
        } catch (error) {
            console.error('Error updating wishlist:', error);
        }
    };

    if (!isLoaded) {
        return <button disabled>Loading...</button>;
    }

    return (
        <button onClick={handleToggleWishlist} className='w-8'>
            {isInWishlist ?  <img src='heart.png' alt='In Wishlist' /> :<img src='wishlist.png' alt='Add to Wishlist'/> }
        </button>
    );
};

export default WishlistButton;
