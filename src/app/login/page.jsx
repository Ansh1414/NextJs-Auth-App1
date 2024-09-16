
"use client"

import Link from "next/link"
import React,{useState} from "react"
import axios from "axios"
import {useRouter} from "next/navigation"
import { toast } from "react-hot-toast";
import SignInForm from "./SignInForm"
import { useDispatch } from "react-redux"
import { setUserId } from '@/store/userSlice.js'; // Import the setUserId action

import Loader from '@/components/Loader.js';

function page() {

  const router = useRouter();
  const [showLoader,setShowLoader]=useState(false)

  const [imageIndex, setImageIndex] = useState(0);
 
  const dispatch=useDispatch();// Get the dispatch function from Redux
  
  const images = [
    '/images/ankush.png',
    '/images/ankita.png'
];

  const handleImageChange = async()=>{
    let imageRemainder=(imageIndex+1)/images.length;
    imageRemainder<1?setImageIndex(imageIndex+1):setImageIndex(0);
  }
  const handleLogin=async (user)=>{
    try {
      setShowLoader(true);
      const response = await axios.post("/api/users/login", user);

      console.log("Login success", response.data);
      if(response.data.status==200){
        toast.success("Login success");
         // Dispatch the setUserId action to store the userId in Redux
        dispatch(setUserId(response.data.userId));

        router.push("/");
      }else{
        toast.error(response.data.error)
      }
  } catch (error) {
      console.log("Login failed", error.message);
      toast.error(error.message);
  } finally{
    setShowLoader(false);
  }

  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-white">
        <hr />
            <Loader showLoading={showLoader}/>
            <div className={`${showLoader ? 'hidden' : 'block'}`}>
              <SignInForm onImageClick={handleImageChange} getImage={images[imageIndex]} onSignInAccount={handleLogin}/>
            </div> 
        </div> 
    )
}

export default page