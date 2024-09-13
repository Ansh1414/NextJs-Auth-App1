
"use client"

import Link from "next/link"
import React,{useState} from "react"
import axios from "axios"
import {useRouter} from "next/navigation"
import { toast } from "react-hot-toast";
import SignInForm from "./SignInForm"
function page() {

  const router = useRouter();
  const [loading, setLoading] = React.useState(false)
  const [user,setUser] = React.useState({email:'',password:''})
  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  const [showNewPassword, setShowNewPassword] = React.useState(false); // New state for showing/hiding new password field

  const [imageIndex, setImageIndex] = useState(0);

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
      setLoading(true);
      const response = await axios.post("/api/users/login", user);

      console.log("Login success", response.data);
      if(response.data.status==200){
        toast.success("Login success");
        router.push("/");
      }else{
        toast.error(response.data.error)
      }
  } catch (error) {
      console.log("Login failed", error.message);
      toast.error(error.message);
  } finally{
    setLoading(false);
  }

  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-white">
        <hr />
            <SignInForm onImageClick={handleImageChange} getImage={images[imageIndex]} onSignInAccount={handleLogin}/>
        </div> 
    )
}

export default page