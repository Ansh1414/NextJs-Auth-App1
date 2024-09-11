import { NextResponse } from 'next/server'
 

export function middleware(request) {
    console.log('--middleware executed---'+request.nextUrl.pathname);
  const path = request.nextUrl.pathname;
  const publicPaths=['/login','/signup','/verifyemail'];
  const isPublicPath = publicPaths.includes(path); 

  const token = request.cookies.get('token')?.value || ''

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (!isPublicPath && !token) {
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