
import React, { useState,useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import {publicDomains} from '@/constants/Constants.js' 
import axios from 'axios'


const HamburgerMenuIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const publicPaths=publicDomains;
  const [menuItems,setMenuItems] = useState([]);
  const [userData,setUserData]=useState('')
  const router = useRouter();

  const isPublicPath = publicPaths.includes(pathname); 

 
 
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  useEffect(() => {
    // Update the state based on the current pathname
    let menuOptions=
    [
        {
            pathname:'Home',
            path:'/'
        },
        {
            pathname:'About',
            path:'/about'
        },
        {
            pathname:'Movies',
            path:'/movies'
        },
        {
            pathname:'Feedback',
            path:'/feedback'
        },
        {
            pathname:'Payment',
            path:'/payment'
        },

    ]
    setMenuItems(menuOptions);
  }, []); // Dependency array to update when pathname changes
  
  if(!isPublicPath){
  return (
    <>
    <div className="float-left px-2"> 
      {/* Hamburger / Close icon */}
            <div onClick={toggleMenu} className="fixed cursor-pointer top-16">
                <span className='rounded-2xl p-2 font-bold w-24 h-10 bg-cyan-200 text-black text-xl'>Menu</span>
            </div>
            <div
             className={`fixed w-max  sm:px-6 lg:px-8 rounded-2xl transition-transform transform   ${
                isOpen ? 'opacity-90 h-auto bg-white text-black translate-y-[6rem]' : 'opacity-90 h-auto bg-white text-black -translate-y-full'
              } duration-500`}
            >
                <ul className="text-lg">
                { (
                
                    menuItems.map((item)=>(
                                    
                        <li className="flex items-start opacity-100 " key= {item.pathname} >
                                    
                            <Link href={item.path} className="w-full block py-2.5 px-4 rounded transition hover:bg-indigo-300 text-black">
                                        
                                <label className="px-3 text-l font-normal uppercase text-gray-900 hover:font-bold">
                                    {item.pathname}
                                </label>
                            </Link>
                            
                        </li>
                    ))
                )}
                </ul>
        
            </div>
            
    </div>
     
      
   
    
  </>)}
       }


export default HamburgerMenuIcon
