'use client';
import { useRouter } from 'next/navigation';
import React,{useEffect, useState} from 'react'
import axios from 'axios'
import MovieCard from './movieCard';
function movieDetailWithId({params}) {
    const router = useRouter();
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
    <MovieCard movie={movieDetail} userId={params.id}/>
  

    </>
  )
}

export default movieDetailWithId