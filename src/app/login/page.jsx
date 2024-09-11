
"use Client"

import Link from "next/link"
function page() {
  return (
    <>
    <div className="bg-black flex flex-col items-center justify-center min-h-screen py-2">
      <div className="text-white">Testing direct login page</div>
      <Link href="/signup">Visit SignUp page</Link>
    </div>
    
     </>
    
  )
}

export default page