import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const privatePaths = ['/me', '/notification', '/search'];
const authPaths = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;
  console.log(accessToken);
  const refreshToken = request.cookies.get('refresh_token')?.value;

  const { pathname } = request.nextUrl;
  console.log(pathname);

  if ((privatePaths.some(path => pathname.startsWith(path)) || pathname === '/') && !accessToken)
    return NextResponse.redirect(new URL('/login', request.url));

  if (authPaths.some(path => pathname.startsWith(path)) && accessToken)
    return NextResponse.redirect(new URL('/', request.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/me',
    '/notification',
    '/search',
    '/reset-password',
    '/forgot-password'
  ]
};
