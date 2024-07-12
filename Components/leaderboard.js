import React, { useState,useEffect } from "react";
import axios from 'axios';
export default function Leaderboard({id}){

    const[leaderboard,setLeaderboard]=useState([])


    useEffect(() => {  
        const fetchLeaderboard = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/diva/leaderboard/',{
                params: {
                    id: id
                  }
            })
            console.log("API call made");
            console.log("reached")
            console.log(response.data.data)
            
            if (response.data) {
              setLeaderboard(response.data.data)      
            }
          } catch (error) {
            console.error('Error fetching competitions:', error)
          }
        }
    
        fetchLeaderboard()
      }, [id])
    
    return(
        <div className="w-screen">
            <div className="pl-40 text-2xl pb-5">
                Leaderboard
            </div>
            <div className=" w-full flex flex-col">
                <div className="flex ">
                   <div className="w-3/12  text-center leading-10">
                   <b> Rank</b>
                   </div>
                   <div className="w-3/12  text-center leading-10">
                   <b>  Diva </b>
                   </div>
                   <div className="w-3/12  text-center leading-10">
                   <b> Design Like </b>
                   </div>
                   <div className="w-3/12  text-center leading-10">
                  <b>  Rating </b>  
                   </div>
                   </div>
                   
                   <div className="flex w-full flex-col">
                         {leaderboard.map((info,key)=>(
                            <div className="flex text-black justify between">
                                 <div className="w-3/12  text-center leading-10">
                                      {key+1}
                                    {console.log(info.username)}
                                </div>
                                <div className="w-3/12  text-center leading-10">
                                {info.username}
                                    </div>

                                    <div className="w-3/12  text-center leading-10">
                                        {info.design_image}
                                        </div>
                                        <div className="w-3/12  text-center leading-10">
                                        {info.no_of_votes}
                                            </div>
</div>
                         ))}
                   </div>
            </div>
        </div>
    )
}