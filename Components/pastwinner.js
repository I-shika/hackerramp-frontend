import React,{useState,useEffect}from "react";
import axios from "axios";

export default function Pastwinner(){
    const[competitions,setCompetitions]=useState(null)
    const[competitionId,setcompetitionId]=useState(null)
    const[scores,setScores]=useState([])
    useEffect(() => {
        // Fetch competitions data
        const fetchCompetitions = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/diva/competition/pastid/')
            if (response.data) {
              setCompetitions(response.data.data.competition_name)
              setcompetitionId(response.data.data.id)
              console.log(competitions)
              console.log(competitionId)       
            }
          } catch (error) {
            console.error('Error fetching competitions:', error)
          }
        }
        
        fetchCompetitions()
      }, [])

      useEffect(() => {
        const fetchScores = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/diva/competition/winner/', {
              params: {
                competitionId: competitionId
              }
            })
            console.log(response.data)
            setScores(response.data.data) // Assuming response.data.scores contains score data
          } catch (error) {
            console.error('Error fetching scores:', error)
          }
        }
        if (competitionId) {
          fetchScores()
        }
      }, [competitionId])
    return(
        <div>
         <div className="flex justify-center text-3xl">
            {competitions} Winners
           
         </div>
         <div className="grid grid-cols-3 gap-y-10 pt-10 pb-10">
            {scores.map((details,key)=>(
                 <div className="flex w-auto pb-10 pt-10 justify-center">
                 <div>
                 <div className="flex justify-center items-center">
                 <b>{details.username.username}</b>
                 </div>
                 <div className="flex justify-center items-center h-full">
                 <img src={`http://localhost:8000${details.design_image}`} alt="Fetched Image" style={{ width: '80%', height: 'auto'}} 
                 className="border-8 border-black items-center border-dotted  w-4/5 h-auto transform transition duration-300 group-hover:scale-105 group-hover:opacity-80"/>
                  {/* <button className="absolute bottom-0 mb-4 opacity-0 transform translate-y-4 transition duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 bg-red-500 text-white py-2 px-4 rounded">
                 Add to Wishlist
             </button> */}
                     </div>
                     </div>
             </div>
            ))}
         </div>
        </div>
    )
}