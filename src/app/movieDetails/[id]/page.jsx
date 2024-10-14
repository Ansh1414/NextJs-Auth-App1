'use client';
import { useRouter } from 'next/navigation';
import React,{useEffect, useState} from 'react'
import axios from 'axios'
import MovieCard from './movieCard';
function MovieDetailWithId({params}) {
<<<<<<< HEAD
  
=======
>>>>>>> 1c102bd2e77824432f64902a602c83ecf6693012
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
    <div className="">
      <MovieCard movie={movieDetail} userId={params.id}/>
    </div>
    
  

    </>
  )
}

export default MovieDetailWithId