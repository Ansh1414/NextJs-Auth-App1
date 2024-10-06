"use client"
import React from 'react'
import ProfileLogout from "./profileLogout.jsx";
import HamburgerMenuIcon from "./HamburgerMenuIcon.jsx";
import {publicDomains} from '@/constants/Constants.js' 
import { usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

import Wallet from './Wallet.jsx';

export default function MovieHeader() {
  const pathname = usePathname();
  const publicPaths=publicDomains;
  const isPublicPath = publicPaths.includes(pathname); 

  console.log("MovieHeader MovieHeader--");
  if(!isPublicPath){
    return (
      <>
      
          <Toaster />
          <div className="fixed container">
              <div className="grid grid-cols-2">
                <div className="bg-transparent"><HamburgerMenuIcon/></div>
                <div className="bg-transparent"><ProfileLogout/></div>
              </div>
              <div className="float-right">
                <div className="bg-transparent"><Wallet /></div>
              </div>
          </div>
          
          
      </>
    )
  }
  
}
