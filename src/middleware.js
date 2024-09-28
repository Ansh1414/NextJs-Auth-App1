
import { NextResponse } from 'next/server'
import { publicDomains } from '@/constants/Constants.js'
import { getToken,decode } from "next-auth/jwt";


export async function middleware(request) {

  const OAuthTokenJWT = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });//setting OAuthTokenJWT in login route
  console.log('--middleware executed session---',OAuthTokenJWT);
  
  const path = request.nextUrl.pathname;
  const publicPaths=publicDomains;
  const isPublicPath = publicPaths.includes(path); 
  
  /*
  *
  const token = request.cookies.get('token')?.value || ''
  const OAuthToken = request.cookies.get("next-auth.session-token")?.value
  console.log('---OAuthToken--',OAuthToken);
  const decodedOAuthTokenJWT = await decode({ token: OAuthToken, secret: process.env.NEXTAUTH_SECRET });
  
  console.log('---decodedOAuthTokenJWT--',decodedOAuthTokenJWT)
  **
  */

  if(isPublicPath && OAuthTokenJWT) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (!isPublicPath && !OAuthTokenJWT) {
     //login page
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
    
}

 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login/:path*',//run on all paths inside login
    '/signup',
    '/verifyemail',
    '/movies',
    '/about'
  ]
}