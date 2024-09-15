"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast";
import CreateMoviesForm from "./CreateMoviesForm"




function page() {
  


  const [load,setLoad]=useState('')


  
  useEffect(()=>{
    console.log('inside CreateMoviesForm useeffect ');
  },[load])
  
  const handleCreateMovie=async (movie)=>{
   // setLoad('isLoading'); //to call useEffect again
   console.log('inside handleCreateMovie--',movie);
   const formData = new FormData();
   formData.append('moviename', movie.moviename);
   formData.append('movieInformation', movie.movieInformation);
 
   // Append file if it exists
   if (movie.coverImage) {
     formData.append('coverImage', movie.coverImage);
   }

   try{
      const response = await axios.post('/api/movies/createMoviesData', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
      console.log("handleCreateMovie success", response.data);
      toast.success("Created Movie successfuly");
   }
   catch(error){
      console.log('error in handleCreateMovie--',error);
      toast.error('error in CreateMovie');

   }
  }

  return (
      <>
       
        <div className="bg-white flex flex-col items-center justify-center min-h-screen py-2">
          <CreateMoviesForm onCreateMovie={handleCreateMovie}/>
        </div>
      </>
  )
}

export default page