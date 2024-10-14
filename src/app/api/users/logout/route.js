import { NextRequest,NextResponse } from "next/server";

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
      console.log('--cookies 1--',cookie[0].trim())
      response.cookies.delete('__Secure-next-auth.session-token');
    }
    return response;
  }catch(error){
    console.log('--error in logout--',error)
    return NextResponse.json({message:error},{status: 500})
  }
}
