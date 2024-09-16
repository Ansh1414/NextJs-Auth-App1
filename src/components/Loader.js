"use client"
import React, { useState } from 'react';
const Loader = ({showLoading}) => (
    <>
        
        {showLoading && 
            (
                // <div className="flex justify-center items-center h-screen">
                //     <div className="border-t-4 border-blue-500 border-solid w-16 h-16 border-gray-300 rounded-full animate-spin"></div>
                // </div>
                <div className="flex justify-center items-center h-screen">
                    <img src="/images/loader.png" alt="Loading..." className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin" />
                </div>
            )
        }
    </>
)
//place below three lines in any component

//import Loader from '@/components/Loader.js';
//const [showLoader,setShowLoader]=useState(false)
//<Loader showLoading={showLoader}/>

    




export default Loader;