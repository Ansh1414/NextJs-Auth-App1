"use client"


import React from "react"
import Link from "next/link"
<<<<<<< HEAD
=======

>>>>>>> 1c102bd2e77824432f64902a602c83ecf6693012
function Page() {
  const [loading, setLoading] = React.useState(false)
  const [user,setUser] = React.useState({email:'',oldpassword:'',newPassword:''})

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


  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
         <h1>{loading ? "Processing" : "Change Password"}</h1>
       
        <hr />
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
          <Link href="/login">Login</Link>
      </div>
      </>
  )
}

export default Page