'use client'
import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import './carousel.css'
import axios from 'axios'
import Leaderboard from './leaderboard'
import RatingStars from './rating'
import WishlistButton from './wishlist'
import { getComments } from './getcomments'
import Communityforum from './communityforum'

const INITIAL_NUMBER_OF_USERS=2;

export default function EmblaCarousel() {
  const saveUserDetails = (newName, newUserId) => {
    setUsername(newName);
    setUserId(newUserId);
    
    // Store values in localStorage
    localStorage.setItem('name', newName);
    localStorage.setItem('userid', newUserId.toString());
  };
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
        const users = await getComments(0, 10); // Fetch the first 2 users
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
        console.log("reached")
        console.log(response.data.data[0].id)

        // Assuming response.data is an array of competition names
        // Default to selecting the first competition initially
        if (response.data) {
          setCompetitions(response.data.data[0].competition_name)
          setcompetitionId(response.data.data[0].id)
          console.log(competitionId)
          // setSelectedCompetition(response.data)          
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

    // const handleCompetitionChange = useCallback((event) => {
    //     setSelectedCompetition(event.target.value)
    //   }, [])

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
 
  // Function to handle rating
  // const handleRateProduct = async (id, name, rating) => {
  //   try {
  //     const response = await axios.post('http://127.0.0.1:8000/diva/ratepost/', {
  //       'id': id,
  //       'username': name,
  //       'rating': rating // Data to send in the request body
  //     });
  //     console.log('API response:', response.data);
  //     // Optionally update state or handle success
  //   } catch (error) {
  //     console.error('Error rating product:', error);
  //     // Handle error state or display an error message
  //   }
  // };
  const handleAddWishlist = async (id, username) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/diva/wishlist/', {
        'id': id,
        'username': localStorage.getItem('userId'),
      });
      console.log('API response:', response.data);
      if (wishlistItems.includes(id)) {
        // If already in wishlist, remove it
        setWishlistItems(wishlistItems.filter(itemId => itemId !== id));
      } else {
        // If not in wishlist, add it
        setWishlistItems([...wishlistItems, id]);
      }
    }
    catch (error) {
      console.error('Error rating product:', error);
      // Handle error state or display an error message
    }
  }
  return (
    <div className='h-full bg-pink-100'>
      <div className='flex justify-around w-full'>
        <div className='font-serif text-4xl w-1/3 text-center'>
          {competitions}
        </div>
        <div className='flex justify-around w-1/3'>
        <div className='text-2xl'>
          <button >Join Competition </button>
        </div>
        <div className='text-2xl'>
          <button>View All </button>
        </div>
        </div>
      </div>
      <div className='w-full h-4/5 items-center'>
        <div className='embla mx-auto mt-12 h-4/5 '>
          <div className='embla__viewport h-4/5 border flex justify-evenly' ref={emblaRef} >

            <div className='embla__container w-4/5 h-full'>

              {scores.map((score, index) => (
                <div key={index} className='embla__slide items-center justify-center w-full h-full'>
                  <div className='pt-2 pb-2'>
                    {score.username}
                  </div>
                  <div className='h-1/2 text-center items-center flex'>
                    <img src={`http://localhost:8000${score.design_image}`} alt="Fetched Image" style={{ width: '80%', height: '50%'}} className="items-center"/>
                  </div>
                  <div className='mt-2 mb-2 flex w-4/5 justify-around'>
                    <div className='' >
                      {score.no_of_votes}
                    </div>
                    <div className='' >
                      <button><RatingStars id={score.id} usern={score.username} /></button>
                    </div>
                    <div className='' >
                      <button ><WishlistButton id={score.id} username={score.username}/></button>
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
            <div>
              <img src='/images/rateIcon.png' />
            </div>
            <div>
              {votes}
            </div>
            <button
              className='w-20 h-14 my-auto bg-black px-2 py-1 text-sm text-white'
              onClick={scrollNext}
            >
              Next
            </button>

          </div>
        </div>
      </div>
      <Leaderboard id={competitionId} />
     
      <Communityforum initialUsers={initialUsers} />
    </div>
  )
}