"use server"
import { NextRequest,NextResponse } from "next/server";
import { cookies } from 'next/headers'
export async function POST(NextRequest){
  try{

    
    /*working code 
    const response = NextResponse.redirect(new URL('/login', request.url));

    // Clear the token cookie
    response.cookies.set('token', '', { path: '/', maxAge: 0 });

    return response;
    */
  
    // request.cookies.delete('token')  

    //const response = NextResponse.redirect(new URL('/login', request.url))
    const response = NextResponse.json({ message: 'Logout successfully' });
    //response.cookies.delete('next-auth.session-token')
    const cookies = NextRequest.cookies;
    console.log('--cookies in logout--',cookies._parsed)
    
    // Loop through each cookie and delete it
    for (const cookie of cookies._parsed) {
      const cookieName = cookie[0].trim();
    console.log('--cookie name--', cookieName);
     if (cookieName === '__Secure-next-auth.session-token') {
      console.log('--cookie inside if --', cookieName);
      // Set the cookie to expire
      const cookieOptions = {
        path: '/', // Make sure the path matches the original cookie
        // You can include `domain` if necessary, e.g., domain: 'yourdomain.com'
      };

  // Delete the specific cookie by setting it with an expiration date in the past
  response.cookies.set(cookieName, '', {
    ...cookieOptions,
    maxAge: -1, // Set maxAge to -1 to effectively delete the cookie
    httpOnly: true,
    secure: true,
  });
      return response;
    }
    }
   
  }catch(error){
    console.log('--error in logout--',error)
    return NextResponse.json({message:error},{status: 500})
  }
}
