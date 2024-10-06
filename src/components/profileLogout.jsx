

import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Image from 'next/image';
// ## TODO : Edit profile
//
const ProfileLogout = () => {
  const [isOpen, setIsOpen] = useState(false);
  console.log('inside profileLogout');
  
  const [menuItems,setMenuItems] = useState([]);
  const [userAvatar,setUserAvatar]=useState('/images/loader.png')
  const router = useRouter();
  
  
  
  const getCookieByName=async()=> {
    try{
      console.log("getCookieByName ProfileLogout---");
      const cookieName={};
      const response = await axios.post("/api/users/fetchUserId", cookieName);
      
      console.log("Login success", response.data);
      const avatarPicture=response.data.userData?.picture;
      setUserAvatar(avatarPicture)
      
      return response.data.userData?.userId;
    }catch(error){
      console.log('error in dashboard--',error)
    }
    
    
}
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout=async ()=>{
    
    try{
      const response = await axios.post("/api/users/logout");
      
      console.log("change Password success", response.data);
      router.push('/login')
    }catch(error){
      console.log('error--',error);
    }
    
  }
  
  useEffect(() => {
    console.log("profileLogout useEffect --");
    // Update the state based on the current pathname
    let menuOptions=
    [
        {
            option:'logOut'
        },
        {
            option:'edit Profile'
        }

    ]
    setMenuItems(menuOptions);
    
    getCookieByName().then(()=>{
      console.log('fetched token in profile logout')
    }).catch(()=>{
      console.log('error in profile logout');
    })
    
    
    
    
  }, []); // Dependency array to update when pathname changes
  
 
  return (
    <>
      <div className="float-right"> 
      {/* Hamburger / Close icon */}
      
      <div onClick={toggleMenu} className="fixed cursor-pointer top-8 right-2 w-[4rem] h-[4rem]">
      
      <img
        src={userAvatar}
        alt="Profile Image"
        className="rounded-lg object-cover"
        sizes="(max-width: 768px) 25vw, (max-width: 1200px) 25vw, 10vw"
      />
        </div>
        <div
             className={`fixed w-max right-2  sm:px-6 lg:px-8 rounded-2xl transition-transform transform   ${
                isOpen ? 'opacity-90 h-auto bg-white text-black translate-y-[6rem]' : 'opacity-90 h-auto bg-white text-black -translate-y-full'
              } duration-500`}
          >
        <ul className="text-lg">
        { (
          
                        menuItems.map((item)=>(
                          
                            <li className="flex items-start opacity-100" key= {item.option} onClick={handleLogout}>
                                        
                                <span data-option={item.option} className="w-full block py-2.5 rounded transition hover:bg-indigo-300 text-black">
                                            
                                    <label className="px-2 text-l font-normal uppercase text-gray-900 hover:font-bold">
                                        {item.option}
                                    </label>
                                </span>
                                
                            </li>
                        ))
        )}
        </ul>
        
        </div>
        
        
      </div>
     
      
   
    
  </>)
       }


export default ProfileLogout
