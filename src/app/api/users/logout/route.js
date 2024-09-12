import { NextRequest, NextResponse } from "next/server";

export async function POST(request){
  try{

console.log('--inside logout--',request.cookies.get('token'))
  /*working code 
  const response = NextResponse.redirect(new URL('/login', request.url));

    // Clear the token cookie
    response.cookies.set('token', '', { path: '/', maxAge: 0 });

    return response;
    */
  
   // request.cookies.delete('token')  

    //const response = NextResponse.redirect(new URL('/login', request.url))
    const response = NextResponse.json({ message: 'Logout successfully' });
    response.cookies.delete('token')
    

  return response;
  }catch(error){
    console.log('--error in logout--',error)
   return NextResponse.json({message:error},{status: 500})
  }
}
