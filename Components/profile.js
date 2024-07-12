'use client'
import React,{useState, useEffect}from "react";
import axios from "axios";

export default function Profile(){
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(null);
    const fetchProfileData = async (userId) => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/diva/profile/?id=${userId}`);
          return response.data.profile;
        } catch (error) {
          console.error('Error fetching profile data:', error);
          throw error;
        }
      };

    const userId = localStorage.getItem('userid');
    useEffect(() => {
    if (userId) {
        fetchProfileData(userId)
          .then(data => {
            setProfileData(data);
          })
          .catch(error => {
            setError(error);
          });
      }
    }, []);
    if (error) {
        return <div>Error fetching profile data: {error.message}</div>;
      }
    return(
        <div>
            {profileData}

        </div>
    )
}