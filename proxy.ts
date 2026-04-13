import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';

const protectedRoutes = ['/admin'];
const protectedApiPrefixes = ['/api/admissions', '/api/contact', '/api/careers'];
const sensitiveMethods = ['GET', 'PATCH', 'DELETE'];

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isProtectedApi =
    protectedApiPrefixes.some(prefix => path.startsWith(prefix)) &&
    sensitiveMethods.includes(req.method);

  if (isProtectedRoute || isProtectedApi) {
    const session = req.cookies.get('admin_session')?.value;

    if (!session) {
      if (isProtectedApi) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      await decrypt(session);
      return NextResponse.next();
    } catch {
      if (isProtectedApi) {
        return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // CORS — restrict API to same origin only
  if (path.startsWith('/api/')) {
    const origin = req.headers.get('origin');
    const host = req.headers.get('host');
    if (origin && host && !origin.includes(host)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  // Security headers for all responses
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; frame-src https://www.google.com https://www.youtube.com; connect-src 'self' https://va.vercel-scripts.com;"
  );
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|igs-logo.png|igs-banner.png|images/).*)',
  ],
};
