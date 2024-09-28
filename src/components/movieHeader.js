"use client"

import React from 'react'
import ProfileLogout from "./profileLogout.jsx";
import HamburgerMenuIcon from "./HamburgerMenuIcon.jsx";
import { Toaster } from 'react-hot-toast';

export default function MovieHeader() {
 
  return (
    <>
    
        <Toaster />
        <div className="container">
            <div className="grid grid-cols-2">
                <div className="bg-transparent"><HamburgerMenuIcon/></div>
                <div className="bg-transparent"><ProfileLogout/></div>
            </div>
        </div>
        
        
    </>
  )
}
