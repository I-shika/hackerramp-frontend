import React, { useState, useEffect } from "react";
import axios from 'axios';
import Link from "next/link";
export default function Leaderboard({ id }) {

  const [leaderboard, setLeaderboard] = useState([])


  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/diva/leaderboard/', {
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
  return (
    <div className="w-1/2">
      <div className="text-center text-3xl pt-10 pb-5">
        Leaderboard
      </div>
      <div className=" w-11/12 ml-10 flex flex-col bg-white rounded-lg">
        <div className="flex ">
          <div className="w-4/12  text-center leading-10">
            <b> Rank</b>
          </div>
          <div className="w-4/12  text-center leading-10">
            <b>  Diva </b>
          </div>
          <div className="w-4/12  text-center leading-10">
            <b>  Rating </b>
          </div>
        </div>

        <div className="flex w-full flex-col">
          {leaderboard.map((info, key) => (
            <div className="flex text-black justify between">
              <div className="w-4/12  text-center leading-10">
                {key + 1}
                {console.log(info.username)}
              </div>
              <div className="w-4/12  text-center leading-10  hover:underline hover:underline-offset-4">
                {/* <button onClick={}> */}
                <Link
                  href={{ pathname: '/genprofile', query: { userId: info.username.id } }}>

                  {info.username.username}
                </Link>
                {/* </button> */}
              </div>

              <div className="w-4/12  text-center leading-10">
                {info.no_of_votes}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}