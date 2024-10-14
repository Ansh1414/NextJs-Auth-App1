"use client"
import React,{useState} from 'react'

function Page() {
  const [appTheme,setAppTheme] =useState(
    {
      fontText:'white',
      background:'indigo-400'
    }
    )

  const changeDarkTheme=()=>{
    const newAppTheme={
      fontText:'white',
      background:'black'
    }
    setAppTheme(newAppTheme);
  }
  const changeLightTheme=()=>{
    const newAppTheme={
      fontText:'black',
      background:'white'
    }
    setAppTheme(newAppTheme);
  }


  return (
    <>
    <div className={`bg-${appTheme.background} flex flex-col items-center justify-center h-screen py-2`}>
     <div className={`text-${appTheme.fontText}`}>About Page</div>
     <button onClick={changeDarkTheme} className={`text-${appTheme.fontText}`}>Change dark Theme</button>
     <button onClick={changeLightTheme} className={`text-${appTheme.fontText}`}>Change light Theme</button>
    </div>
</>
  )
}

<<<<<<< HEAD
export default Page
=======
export default Page
>>>>>>> 1c102bd2e77824432f64902a602c83ecf6693012
