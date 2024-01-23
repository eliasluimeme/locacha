import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose'

export const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
  }

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('access_token')?.value;

    if (request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/post') {
      try {
        await jwtVerify(token!, new TextEncoder().encode(process.env.JWT_SECRET));

        return NextResponse.next();
      } catch (error) {
        console.log(process.env.FRONTEND_URL+ '/SignIn')
        return NextResponse.redirect(process.env.FRONTEND_URL + '/SignIn');
      }
  }

  if (request.nextUrl.pathname === '/SignIn' || request.nextUrl.pathname === '/SignUp') {
    try {
      await jwtVerify(token!, new TextEncoder().encode(process.env.JWT_SECRET));
      return NextResponse.redirect(process.env.FRONTEND_URL + '');
    } catch (error) {
        return NextResponse.next();
    }
  }
  return NextResponse.next();
}
