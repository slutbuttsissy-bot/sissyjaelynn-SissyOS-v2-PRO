import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 2257 simple gate example (expand with real Supabase in prod)
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const cookie = request.cookies.get('sissyos-2257')?.value;
    if (!cookie || !cookie.includes('2257')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  return NextResponse.next();
}
export const config = { matcher: ['/admin/:path*'] }; // deploy-gate cookie 2257 + edit for diffs