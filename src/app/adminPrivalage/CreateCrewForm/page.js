"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast";
import CreateCrewForm from "./CreateCrewForm"

// page to redirect adminPrivalage/CreateCrewForm


function page() {
  


  const [load,setLoad]=useState('')


  
  useEffect(()=>{
    console.log('inside CreateCrewForm useeffect ');
  },[load])
  
  const handleCreateCrew=async (crewMember)=>{
   // setLoad('isLoading'); //to call useEffect again
   console.log('inside handleCreateMovie--',crewMember);
   const formData = new FormData();
   formData.append('personName', crewMember.personName);
   formData.append('personRole', crewMember.personRole);
   formData.append('movieName', crewMember.movieName);
   
 
   // Append file if it exists
   if (crewMember.personImage) {
     formData.append('personImage', crewMember.personImage);
   }

   try{
      const response = await axios.post('/api/movieCrew/createMovieCrewData', formData, {
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
          <CreateCrewForm onCreateCrew={handleCreateCrew}/>
        </div>
      </>
  )
}

export default page