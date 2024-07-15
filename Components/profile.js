'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Profile({userid}) {
    const [profileData, setProfileData] = useState(null);
    const[postdata,setPostData]=useState([])
    const [error, setError] = useState(null);

    const fetchProfileData = async (userId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/diva/profile/?id=${userId}`);
            console.log("profile", response.data.profile);
            return response.data.profile;
        } catch (error) {
            console.error('Error fetching profile data:', error);
            throw error;
        }
    };
   const fetchPosts=async(userId)=>{
    try {
        const response = await axios.get(`http://127.0.0.1:8000/diva/posts/?id=${userId}`);
        console.log("", response.data.posts);
        return response.data.posts;
    } catch (error) {
        console.error('Error fetching profile data:', error);
        throw error;
    }
   }
  console.log("iuserid",{userid})
 
    useEffect(() => {
        console.log(userid)
        if (!userid) {
            const storedUserId = JSON.parse(localStorage.getItem('userId'));
            if (storedUserId) {
                userid = storedUserId;
                console.log("userId",userid)
            }
        }
       
        if (userid) {
            console.log('userid',userid)
            fetchProfileData(userid)
                .then(data => {
                    setProfileData(data);
                })
                .catch(error => {
                    setError(error);
                });
            
                fetchPosts(userid)
                .then(data => {
                    setPostData(data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
        else{
            console.log("no user id")
        }
    }, [userid]); // Added userId as a dependency

    if (error) {
        return <div>Error fetching profile data: {error.message}</div>;
    }

    return (
        <div className="bg-pink-100 h-full pb-10">
            <div>
            {profileData ? (
                <div className="flex w-full justify-around">
                    <div className="flex flex-col w-1/4 ">
                        <div className="text-4xl">
                            <b>
                        {profileData.username}
                        </b>
                        </div>
                        
                        <div className="">
                            {profileData.about}
                            </div>
                        </div>

                        <div className="flex justify-between w-1/2 text-center">
                          <div className="w-2/12">
                        <div className="text-2xl ">
                        {profileData.ranking}
                         </div>
                         <div>
                            Ranking
                            </div>
                            </div>
                            <div className="w-2/12">
                            <div className="text-2xl">
                        {profileData.followers}
                         </div>
                         <div>
                            Followers
                            </div>
                            </div>
                            <div className="w-2/12">
                            <div className="text-2xl">
                        {profileData.ranking}
                         </div>
                         <div>
                            Following
                            </div>
                            </div>
                            </div>

                    {/* Add more profile fields as needed */}
                </div>
            ) : (
                <div>Can't load Data</div>
            )}
            </div>
            <div className="text-3xl flex justify-center items-center pt-10 pb-10">
                My Design
            </div>
            <div>
            {postdata ? (
                <div className="grid grid-cols-3 gap-4 ">
                   { postdata.map((profile,key) =>(
                        <div className="flex w-auto gap-y-4">
                            <div>
                                <div className="flex justify-around">
                            <div className="flex justify-center items-center">
                            {profile.username.username}
                            </div>
                            <div className="flex justify-center items-center">
                            {profile.no_of_votes}
                            </div>
                            </div>
                            <div className="flex justify-center items-center h-full">
                            <img src={`http://localhost:8000${profile.design_image}`} alt="Fetched Image" style={{ width: '80%', height: 'auto'}} 
                            className="border-8 border-black items-center border-double  w-4/5 h-auto transform transition duration-300 group-hover:scale-105 group-hover:opacity-80"/>
                             <button className="absolute bottom-0 mb-4 opacity-0 transform translate-y-4 transition duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 bg-red-500 text-white py-2 px-4 rounded">
                            Add to Wishlist
                        </button>
                                </div>
                                </div>
                        </div>
                    ))}
                </div>
        ) : (
                <div>Can't load Data</div>
            )}
            </div>
        </div>
    );
}
