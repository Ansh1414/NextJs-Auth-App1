"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast";
import SignUpForm from "./SignUpForm"
import Loader from '@/components/Loader.js';




function page() {
  const [imageIndex, setImageIndex] = useState(0);
  const [showLoader,setShowLoader]=useState(false)

  const images = [
    '/images/ankush.png',
    '/images/ankita.png'
];

const handleImageChange = async()=>{
  let imageRemainder=(imageIndex+1)/images.length;
  imageRemainder<1?setImageIndex(imageIndex+1):setImageIndex(0);
}

  const [load,setLoad]=useState('')

  
  useEffect(()=>{
  console.log('inside useEffect');
},[load])
  
  const handleSignup=async (user)=>{
   // setLoad('isLoading'); //to call useEffect again
   console.log('inside handleFun--',user);
   
   try{
    setShowLoader(true)
    const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            toast.success("SignUp successfuly");
   }
   catch(error){
    console.log('error in signup--',error);
    toast.error('error in signup');

   }finally{
    setShowLoader(false)
   }
  }

  return (
      <>
       
        <div className="bg-white flex flex-col items-center justify-center min-h-screen py-2">
          <Loader showLoading={showLoader}/>
          <div className={`${showLoader ? 'hidden' : 'block'}`}>
            <SignUpForm onImageClick = {handleImageChange} getImage={images[imageIndex]} onCreateAccount={handleSignup}/>
          </div>
        </div>
      </>
  )
}

export default page