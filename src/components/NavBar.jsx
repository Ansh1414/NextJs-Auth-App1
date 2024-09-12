"use client"
import { usePathname } from 'next/navigation';

import { useState,useEffect } from 'react';
import Link from 'next/link';
import {publicDomains} from '@/constants/Constants.js' 

function NavBar () {
    
    const pathname = usePathname();
    const publicPaths=publicDomains;
    const [menuItems,setMenuItems] = useState([]);
    

    const isPublicPath = publicPaths.includes(pathname); 
  
   

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
        }
    ]
    
       
            
        
        setMenuItems(menuOptions);

    
  }, []); // Dependency array to update when pathname changes


  
   if(!isPublicPath){
            return (<aside className="flex w-64 flex-col overflow-y-auto border-r bg-gray-400 px-5 py-8">
                    
            <div className="flex items-center justify-between">
                <span className="text-black text-xl font-bold">Dashboard</span>
            </div>
                {/* Navigation Links */}
                <ul className="mt-6">

        { (
            menuItems.map((item)=>(
                <li key= {item.pathname}>
                            
                    <Link href={item.path} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-500 hover:text-white text-black">
                                
                        <label className="px-3 text-l font-semibold uppercase text-gray-900">
                            {item.pathname}
                        </label>
                        </Link>
                    
                </li>
            ))
        )
        }
        </ul>
        </aside>
        )
   }else{
    return (
        <>
        </>
    )
   }
   
}

export {NavBar}