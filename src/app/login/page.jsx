
"use client"

import Link from "next/link"
import React from "react"
import axios from "axios"
import {useRouter} from "next/navigation"
import { toast } from "react-hot-toast";
function page() {

  const router = useRouter();
  const [loading, setLoading] = React.useState(false)
  const [user,setUser] = React.useState({email:'',password:'',oldpassword:'',newPassword:''})
  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  const [showNewPassword, setShowNewPassword] = React.useState(false); // New state for showing/hiding new password field

  const handleChangePassword=async ()=>{
    try{
      setLoading(true);
      await axios.post("/api/users/changePassword", user);
      toast.success("Password change successfuly");
    }catch(error){
      setLoading(false);
      console.log('change Password error-',error);
      toast.error(error.message);
    }
  }
  const onLogin=async ()=>{
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/");
  } catch (error) {
      console.log("Login failed", error.message);
      toast.error(error.message);
  } finally{
    setLoading(false);
  }

  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "Login"}</h1>
       
        <hr />
        {!showNewPassword && (
          <>
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
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login here</button>
            </>
      )}
            
          {/* forgot password */}
           <div className="flex items-center mb-4">
            <input
              id="showNewPassword"
              type="checkbox"
              checked={showNewPassword}
              onChange={() => setShowNewPassword(!showNewPassword)}
              className="mr-2"
            />
            <label htmlFor="showNewPassword">Change Password</label>
          </div>
      
      {showNewPassword && (
        <>
        <label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="oldpassword">Old Password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="oldpassword"
            type="password"
            value={user.oldpassword}
            onChange={(e) => setUser({...user, oldpassword: e.target.value})}
            placeholder="old password"
            />
           
          <label htmlFor="newPassword">New password</label>
            <input 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="newPassword"
            type="text"
            value={user.newPassword}
            onChange={(e) => setUser({...user, newPassword: e.target.value})}
            placeholder="newPassword"
            />
            

            <button
            onClick={handleChangePassword}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Change Password</button>
      </>
      )}
      
            <Link href="/signup">Visit Signup page</Link>
        </div>
    )
}

export default page