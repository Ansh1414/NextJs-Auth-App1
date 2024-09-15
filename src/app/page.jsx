"use client"
//home page
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';
import { useSelector } from 'react-redux'; // Import the useSelector hook

export default function Home() {

  const router = useRouter();
  // Get the userId from Redux state
  
  const userId=useSelector((state)=>state.user.userId);
 
  
  const handleLogout=async ()=>{
 
    try{
      const response = await axios.post("/api/users/logout");
     
      console.log("change Password success", response.data);
      router.push('/login')
    }catch(error){
      console.log('error--',error);
    }
   
  }
  async function getCookieByName(cookieName) {
    try{
      const response = await axios.post("/api/users/fetchUserId", cookieName);
      console.log("Login success", response.data);
    }catch(error){
      console.log('error in dashboard--',error)
    }
    
  }
  useEffect(()=>{
    let cookieName={name:'token'}
    getCookieByName(cookieName);
  },[])


  return (
   
    <>
    <div className="mx-auto h-screen max-w-7xl md:px-12">
        
      <div className="my-4">
      <button className="flex m-10 p-2 float-end bg-white rounded-lg text-red-600" onClick={handleLogout}>Logout</button>
    
        <h1 className="text-3xl font-bold">Our Team</h1>
        
        <p className="mt-2 text-white">
          Hi every one. Below are nely listed movies
        </p>
      </div>
        <div className="grid grid-cols-1 gap-[50px] md:grid-cols-3">
          
          <div className="flex flex-col items-center text-start">
            <div
              className="relative flex h-[342px] w-full flex-col justify-end rounded-[10px] bg-red-300"
            >
              <img
                src="/images/ankush.png"
                alt=""
                className="z-0 h-full w-full rounded-[10px] object-cover"
              />
              <div className="absolute bottom-4 left-4">
                <h1 className="text-xl font-semibold text-white">Ankush Sharma</h1>
                <h6 className="text-base text-white">Frontend Backend Developer</h6>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center text-start">
            <div
              className="relative flex h-[342px] w-full flex-col justify-end rounded-[10px] bg-red-300"
              
            >
              <img
                src="/images/ankita.png"
                alt=""
                className="z-0 h-full w-full rounded-[10px] object-cover"
              />
              <div className="absolute bottom-4 left-4">
                <h1 className="text-xl font-semibold text-white">Ankita Sharma</h1>
                <h6 className="text-base text-white">Marketing head</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
