"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation'


export default function Home() {
  const router = useRouter();
  
  const handleLogout=async ()=>{
 
    try{
      const response = await axios.post("/api/users/logout");
     
      console.log("change Password success", response.data);
      router.push('/login')
    }catch(error){
      console.log('error--',error);
    }
   
  }

  return (
   
    <>
    <div className="mx-auto max-w-7xl px-2 md:px-0">
  <div className="my-4">
    <h1 className="text-3xl font-bold">Our Team</h1>
    <p className="mt-2 text-white">
      Hi every one 
      
      <button className="p-4 rounded-lg text-red-600" onClick={handleLogout}>Logout</button>
    
    </p>
  </div>
  <div className="grid grid-cols-1 gap-[50px] md:grid-cols-2">
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
