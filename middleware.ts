import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const res = NextResponse.next();
  if (
    !pathname.startsWith('/_next/') &&
    !pathname.startsWith('/api/') &&
    !pathname.startsWith('/static/') && !pathname.startsWith('/uploads/') && pathname !== '/sw.js' &&
    !pathname.endsWith('.json')
  ) {
    res.headers.set('Content-Type', 'text/html; charset=utf-8');
    res.headers.set('Cache-Control', 'no-store, max-age=0');
    res.headers.set('Content-Language', 'zh-CN');
  }
  return res;
}

export const config = {
  matcher: ['/((?!_next/|api/|favicon.ico|static/).*)'],
};
// codex-ok: 2026-04-13T16:49:53
