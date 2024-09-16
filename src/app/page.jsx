"use client"
//home page
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import {fetchUserFavMovies} from '@/helpers/browserStorage.js';
import Loader from '@/components/Loader.js';
export default function Home() {

  const router = useRouter();
  // Get the userId from Redux state
  
  
  const [moviesData,setMoviesData]=useState([]);
  const [storedUserFavMovies, setStoredUserFavMovies] = useState([]);
  const [userId,setUserId]=useState('')
  const [showLoader,setShowLoader]=useState(true)
  

  const handleLogout=async ()=>{
 
    try{
      const response = await axios.post("/api/users/logout");
     
      console.log("change Password success", response.data);
      router.push('/login')
    }catch(error){
      console.log('error--',error);
    }
   
  }
  async function getCookieByName(cookieName) {
    try{
      setShowLoader(true);
      const response = await axios.post("/api/users/fetchUserId", cookieName);
      console.log("Login success", response.data);
      setUserId(response.data.userId)
      
      return response.data.userId;
    }catch(error){
      console.log('error in dashboard--',error)
    }
    finally{
      setShowLoader(false);
    }
    
  }
  const fetchUserFavMoviesFromServer = async (loggedInUserId,fetchedMoviesData)=>{
   try {
    setShowLoader(true);
     const response = await axios.post("/api/userMovies/fetchFavouriteMovies",{loggedInUserId});
     console.log("fetched UserFavMoviesFromServer success", response.data);
     
     makeDataForDashboard(response.data.userMoviesData,fetchedMoviesData);
   } catch (error) {
    console.log('UserFavMoviesFromServer throws error--',error);
   }
   finally{
    setShowLoader(false);
  }
  }

  async function fetchMovies(loggedInUserId) {
    try{
      setShowLoader(true);
        const response = await axios.post("/api/movies/fetchMovies",{});
        console.log("Login success", response.data);
        console.log('storedUserFavMovies ',storedUserFavMovies);
        const fetchedMoviesData=response.data.moviesData;

        const fetchStoredValues=fetchUserFavMovies('userFavMovies');
        if(!fetchStoredValues){
          fetchUserFavMoviesFromServer(loggedInUserId,fetchedMoviesData)
        }else{
          makeDataForDashboard(fetchStoredValues,fetchedMoviesData);
        }
        
      }catch(error){
      console.log('error in dashboard--',error)
    }
    finally{
      setShowLoader(false);
    }
    
  }

  const makeDataForDashboard=(fetchStoredValues,fetchedMoviesData)=>{
    console.log('--- makeDataForDashboard --');
    // Create a lookup set of favorite movie IDs
    const favMovieIds = new Set();
    if(fetchStoredValues){
      fetchStoredValues.forEach(movie => movie.isSelected && favMovieIds.add(movie.movieId));
    }
    console.log('favMovieIds--',favMovieIds);
    // Add `isSelected` attribute to each movie in `moviesData`
    const updatedMoviesData = fetchedMoviesData.map(movie => ({
      ...movie,
      isSelected: favMovieIds.has(movie._id) // Check if movie._id is in the set of favorite movie IDs
    }));
    
    setMoviesData(updatedMoviesData);
  }

  const handleFavouriteMovie = (id) => {
    
    setMoviesData(prevMovies =>
      prevMovies.map(movie =>
        movie._id === id
          ? { ...movie, isSelected: !movie.isSelected }
          : movie
      )
    );

  };
  
  const saveMyFavouriteMovies = async ()=> {
    try{
      setShowLoader(true);
      /*let userFavMovies=moviesData.filter( movie =>(movie.isSelected===true))
      
      userFavMovies=userFavMovies.map(movie=>({
        movieId: movie._id, // Renaming _id to movieId
        userId: userId      // Adding userId to each movie
      }))*/

      let userFavMovies=moviesData.map(movie=>(
          {
            movieId: movie._id, // Renaming _id to movieId
            userId: userId,
            isSelected:movie.isSelected
          }
        )
      )

      
      sessionStorage.setItem('userFavMovies', JSON.stringify(userFavMovies));

      const response = await axios.post("/api/userMovies/saveMyFavouriteMovies",{userFavMovies});
      console.log('response in dashboard--',response)
    }catch(error){
      console.log('error in dashboard--',error)
    }
    finally{
      setShowLoader(false);
    }
    
  }
  
  useEffect(()=>{
      let cookieName={name:'token'}
      getCookieByName(cookieName).then((loggedInUserId)=>{  //fetch cookies first to get userId
      fetchMovies(loggedInUserId);
    }).catch((error)=>{
      console.log('error---',error);
    })
    
  },[])


  return (
   
    <>
    
    <Loader showLoading={showLoader}/>

    <div className={`${showLoader ? 'hidden' : 'block mx-auto h-screen max-w-7xl md:px-12'}`}>
        
      <div className="my-4">
      <button className="flex m-10 p-2 float-end bg-white rounded-lg text-red-600" onClick={handleLogout}>Logout</button>
    
        <h1 className="text-3xl font-bold">Our Team</h1>
        
        <p className="mt-2 text-white">
          Hi every one. Below are newly listed movies
        </p>
      </div>
        <div className="grid grid-cols-1 gap-[50px] md:grid-cols-3">
          {moviesData.map((data)=>(
            <div key={data._id} className="flex flex-col items-center text-start">
              <div
                className="relative flex h-[342px] w-full flex-col justify-end rounded-[10px] bg-red-300"
              >
                <img
                  src={data.coverImage}
                  alt=""
                  className="z-0 h-full w-full rounded-[10px] object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <h1 className="text-xl font-semibold text-white">{data.moviename}</h1>
                  <h6 className="text-base text-white">{data.movieInformation}</h6>
                </div>
              </div>
              <div data-id={data._id} 
              onClick={() => handleFavouriteMovie(data._id)} 
              style={{ cursor: 'pointer', fontSize: '24px',color: data.isSelected  ? 'red' : 'grey' }}>
                <FontAwesomeIcon icon={ data.isSelected ? solidHeart : regularHeart} />
              </div>
           </div>
          
        
          ))}
          
          
        </div>
              <button
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                onClick={saveMyFavouriteMovies}>
                  <span className="mr-2 inline-block text-red-500">
                    Save
                  </span>
                 My Favourite Movies
              </button>
      </div>
    </>
  );
}
