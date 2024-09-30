import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const privatePaths = ['/me', '/notification', '/search'];
const authPaths = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;

  const refreshToken = request.cookies.get('refresh_token')?.value;
  const hasAccessToken = accessToken && accessToken !== 'j:null';
  const { pathname } = request.nextUrl;

  if ((privatePaths.some(path => pathname.startsWith(path)) || pathname === '/') && !hasAccessToken)
    return NextResponse.redirect(new URL('/login', request.url));

  if (authPaths.some(path => pathname.startsWith(path)) && hasAccessToken)
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
