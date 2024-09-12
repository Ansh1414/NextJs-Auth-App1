"use client"
import { useEffect, useState } from "react"
import axios from "axios"

import Link from "next/link"
import { toast } from "react-hot-toast";
import SignUpForm from "@/components/SignUpForm"




function page() {
  const [imageIndex, setImageIndex] = useState(0);

  const images = [
    '/images/ankush.png',
    '/images/ankita.png'
];

const changeImage = () => {
  setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
};

  const [load,setLoad]=useState('')

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
})
  useEffect(()=>{
  console.log('inside useEffect');
},[load])
  
  const handleSignup=async (user)=>{
   // setLoad('isLoading'); //to call useEffect again
   console.log('inside handleFun--',user);
   try{
    const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            toast.success("SignUp successfuly");
   }
   catch(error){
    console.log('error in signup--',error);
    toast.error('error in signup');

   }
  }

  return (
    <>

{/* <div className="bg-blue-950 flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "Signup"}</h1>
        <hr />
        <label htmlFor="name">name</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="name"
            type="text"
            value={user.name}
            onChange={(e) => setUser({...user, name: e.target.value})}
            placeholder="name"
            />
        <label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
            
            <button
            onClick={handleSignup}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No signup" : "Signup"}</button>
            <Link href="/login">Visit login page</Link>
        </div> */}

<div className="bg-white flex flex-col items-center justify-center min-h-screen py-2">
        <SignUpForm getImage={images[imageIndex]} onCreateAccount={handleSignup}/>
        </div>
      </>
  )
}

export default page