'use client'
import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import './carousel.css'
import axios from 'axios'
import Leaderboard from './leaderboard'
import RatingStars from './rating'
import Pastwinner from './pastwinner'
import WishlistButton from './wishlist'
import { getComments } from './getcomments'
import Communityforum from './communityforum'
import Styling from './imageslider'
import Link from 'next/link'
const INITIAL_NUMBER_OF_USERS=2;

export default function EmblaCarousel() {
    localStorage.setItem('name', 'Ishika');
    const userid=1
    localStorage.setItem('userId',JSON.stringify(userid));
//     console.log(localStorage.getItem('name')); // Should log "Ishika"
// console.log(JSON.parse(localStorage.getItem('userId')));
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [competitions, setCompetitions] = useState([])
  const [competitionId, setcompetitionId] = useState('')
  const [scores, setScores] = useState([])
  const [votes, setVotes] = useState('')
  const [username, setUsername] = useState('')
  const [wishlistItems, setWishlistItems] = useState([]) // Track wishlist items
  const [initialUsers, setInitialUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getComments(0, 10); 
        setInitialUsers(users);
        console.log("users")
        console.log(users)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);
 
 
  useEffect(() => {
    // Fetch competitions data
    const fetchCompetitions = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/diva/competitionname/')
        if (response.data) {
          setCompetitions(response.data.data[0].competition_name)
          setcompetitionId(response.data.data[0].id)
          console.log(competitions)
          console.log(competitionId)
          // setSelectedCompetition(response.data)          
        }
      } catch (error) {
        console.error('Error fetching competitions:', error)
      }
    }
    fetchCompetitions()
  }, [competitions])

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/diva/competitionentries/', {
          params: {
            competition_name: competitionId
          }
        })
        console.log(response.data)
        setScores(response.data.data) // Assuming response.data.scores contains score data
      } catch (error) {
        console.error('Error fetching scores:', error)
      }
    }
    if (competitions) {
      fetchScores()
    }
  }, [competitions])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])
 
 
  return (
    <div className='h-full bg-pink-100'>
      <div className='flex justify-evenly w-full pr-10' >
        <div className='font-serif text-4xl w-1/2 text-center text-pink-600'>
         {competitions}
        </div>
        <div className='flex justify-end w-1/2 text-end ml-10'>
        <div className='text-xl w-3/12 h-10 bg-pink-600 flex flex-end justify-center items-center font-semibold align-text-bottom text-white rounded-full'>
        <Link
                  href='/joincomp'>
Join Competition</Link>
        </div>

        </div>
      </div>
      <div className='w-full  items-center'>
        <div className='embla mx-auto mt-12 '>
          <div className='embla__viewport border flex justify-evenly'  ref={emblaRef} >
            <div className='embla__container w-2/6 h-full'>

              {scores.map((score, index) => (
                <div key={index} className='embla__slide items-center justify-center w-20 h-auto '>
                  <div className='pt-2 pb-2'>
                    {score.username.username}
                  </div>
                  <div className='h-auto text-center items-center flex border-solid border-2 '>
                    <img src={`http://localhost:8000${score.design_image}`} alt="Fetched Image"  className="items-center border-solid border-2 border-slate-500"/>
                  </div>
                  <div className='mt-2 mb-2 ml-2 flex w-11/12  justify-evenly'>
                    <div className='' >
                      {score.no_of_votes} Votes
                    </div>
                    <div className='' >
                      <button><RatingStars id={score.id} usern={score.username} /></button>
                    </div>
                    <div className='' >
                      <button ><WishlistButton id={score.id} username={score.username.id}/></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          <div className=' flex justify-between ml-10 mr-10 pb-10'>
            <button
              className='w-20 h-14 bg-black px-2 py-1 text-sm text-white h-auto'
              onClick={scrollPrev}
            >
              Prev
            </button>

           
            <button
              className='w-20 h-14 my-auto bg-black px-2 py-1 text-sm text-white'
              onClick={scrollNext}
            >
              Next
            </button>
           

          </div>
        </div>
      </div>
      <div className='flex justify-evenly'>
       
      <Leaderboard id={competitionId} />
    
      <Communityforum initialUsers={initialUsers} />

     
      </div>
      <Pastwinner/>
      <div className='flex justify-end w-full text-end mb-10 pb-10'>
      <div className='text-xl w-1/5 h-10 bg-pink-600 flex flex-end justify-center items-center font-semibold align-text-bottom text-white rounded-full'>
  <Link
                  href='/viewallpost'>
View All Designs</Link>
  </div>
  </div>
 <div>
 
 </div>
    </div>
  )
}