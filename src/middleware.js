import { NextResponse } from 'next/server'
import {publicDomains} from '@/constants/Constants.js' 

export function middleware(request) {
    
  const path = request.nextUrl.pathname;
  console.log('--middleware executed---',publicDomains);
  const publicPaths=publicDomains;
  console.log('--middleware executed---',path);
  const isPublicPath = publicPaths.includes(path); 

  const token = request.cookies.get('token')?.value || ''
  
  if(isPublicPath && token) {
    //dashboard page
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (!isPublicPath && !token) {
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
    '/verifyemail'
  ]
}