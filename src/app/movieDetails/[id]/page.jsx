'use client';

import React,{useEffect, useState} from 'react'
import axios from 'axios'
import MovieCard from './movieCard';
function MovieDetailWithId({params}) {
  
    const [movieDetail,setmovieDetails]=useState({});
    const [showLoader,setShowLoader]=useState(false);


    async function fetchMovieInformation() {
        try{
          
          setShowLoader(true);
          const response = await axios.post("/api/movieCrew/fetchMovieCrewData",{movieId:params.id});
          console.log("Login success", response.data.data);
          setmovieDetails(response.data.data);
          
          
        }catch(error){
          console.log('error in dashboard--',error)
        }
        finally{
          setShowLoader(false);
        }
        
      }

      useEffect(() => {
        // Check if id is available
       
        fetchMovieInformation();
        
      }, []);
      
  return (
    <>
    <div className="">
      <MovieCard movie={movieDetail} userId={params.id}/>
    </div>
    
  

    </>
  )
}

export default MovieDetailWithId