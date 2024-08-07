import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const privatePaths = ['/me', '/notification', '/search'];
const authPaths = ['/login', '/register'];

export async function middleware(req: NextRequest) {
  console.log('Hello World! ---------');
  console.log(req.nextUrl.pathname);
  console.log('Hello World!');
  // const { pathname } = req.nextUrl;
  // console.log(pathname);
  // const accessToken = req.cookies.get('access_token')?.value;

  // if (privatePaths.some(path => pathname.startsWith(path)) && !accessToken)
  //   return NextResponse.redirect(new URL('/login', req.url));

  // if (
  //   (authPaths.some(path => pathname.startsWith(path)) ||
  //     pathname === 'undefined') &&
  //   accessToken
  // )
  //   return NextResponse.redirect(new URL('/me', req.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/me',
    '/notification',
    '/search',
    '/reset-password',
    '/forgot-password'
  ]
};
