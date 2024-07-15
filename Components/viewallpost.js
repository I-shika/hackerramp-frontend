'use client'
import React,{useEffect, useState} from "react";
import axios from "axios";

export default function Viewallposts(){
  const[posts,setPosts]=useState([])
    useEffect(() => {
    const fetchPosts=async()=>{
        try {
            const response = await axios.get(`http://127.0.0.1:8000/diva/allposts/`);
            setPosts(response.data.data);
        } catch (error) {
            console.error('Error fetching profile data:', error);
            throw error;
        }
       }
       fetchPosts()
    }, [])
    return(
        <div className="bg-pink-100">
        <div className="grid grid-cols-3 gap-y-4 pt-10">
          {posts.map((post,key)=>(
            <div className="flex w-auto justify-center">
            <div>
                <div className="flex justify-around">
            <div className="flex justify-center items-center">
            {post.username.username}
            </div>
            <div className="flex justify-center items-center">
            {post.no_of_votes}
            </div>
            </div>
            <div className="flex justify-center items-center h-full">
            <img src={`http://localhost:8000${post.design_image}`} alt="Fetched Image" style={{ width: '80%', height: 'auto'}} 
            className="border-8 border-black items-center border-double  w-4/5 h-auto transform transition duration-300 group-hover:scale-105 group-hover:opacity-80 flex justify-center"/>
             <button className="absolute bottom-0 mb-4 opacity-0 transform translate-y-4 transition duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 bg-red-500 text-white py-2 px-4 rounded">
            Add to Wishlist
        </button>
                </div>
                </div>
        </div>
        
          ))}
        </div>
        </div>
    )
}