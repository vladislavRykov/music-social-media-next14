import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from './lib/sessions';
import { cookies } from 'next/headers';
import { SessionPayload } from './types/types';
import { JWTPayload } from 'jose';

const protectedRoutes = ['/user', '/settings', '/chat'];
const publicRoutes = [''];
const authRoutes = ['/login', '/signup'];

export async function middleware(req: NextRequest) {
  // await mongooseConnect();
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((protectedRath) => path.startsWith(protectedRath));
  const isAuthRoute = authRoutes.includes(path);
  const session = (await cookies()).get('session')?.value;
  const payload = (await decrypt(session)) as undefined | (SessionPayload & JWTPayload);
  let token = null;
  try {
    const res = await fetch('http://localhost:3000/api/session', {
      method: 'POST',

      body: JSON.stringify({ session }),
    });
    const data = await res.json();
    token = data;
  } catch (error) {}

  if (isProtectedRoute && (!payload || !token)) {
    // if (isProtectedRoute && !payload) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }
  if (isAuthRoute && payload?.userId && token) {
    return NextResponse.redirect(new URL('/home', req.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  // matcher solution for public, api, assets and _next exclusion
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
