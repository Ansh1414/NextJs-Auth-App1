"use client"
import React, { useState,useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {publicDomains} from '@/constants/Constants.js' 

const HamburgerMenuIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const publicPaths=publicDomains;
  const [menuItems,setMenuItems] = useState([]);
  

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
        }
    ]
    
       
            
        
        setMenuItems(menuOptions);

    
  }, []); // Dependency array to update when pathname changes


  if(!isPublicPath){
  return (
    <>
    
    <div className="align-middle">
      {/* Hamburger / Close icon */}
      <div className="p-4 mt-10 flex justify-between items-center">
        <div onClick={toggleMenu} className="cursor-pointer">
          {isOpen ? (
            <span className="text-3xl"></span> // Close icon
          ) : (
            
             <span className='rounded-2xl p-2 font-bold w-24 h-10 bg-cyan-200 text-black text-xl'>Menu</span>
          
          )}
        </div>
        <div className="text-xl font-bold"></div>
      </div>


         {/* Slide-in menu */}
         <div
        className={`opacity-90 fixed top-0 items-start px-4  sm:px-6   lg:px-8   rounded-2xl transition-transform transform   ${
          isOpen ? 'h-screen bg-white text-black translate-y-0' : 'h-screen bg-white text-black -translate-y-full'
        } duration-500 z-40`}
      >
        <ul className="mt-20 space-y-6 text-lg px-4">
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
        
      

       {/* Background overlay */}
       {isOpen && (
        <div
          className="fixed top-10 opacity-100"
          onClick={toggleMenu}
        >
          <div className="space-y-2">
          <div class="relative w-8 h-8">
    <div class="absolute top-1/2 left-0 transform -translate-y-1/2 w-8 h-1 bg-black rotate-45"></div>
    <div class="absolute top-1/2 left-0 transform -translate-y-1/2 w-8 h-1 bg-black -rotate-45"></div>
</div>
          </div>
      </div>
      )}
    </div>
    </div>
  </>)}
       }


export default HamburgerMenuIcon
