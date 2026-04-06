import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';

// Protected routes that require authentication
const protectedRoutes = ['/admin'];
// Protected API routes (sensitive methods only)
const protectedApiPrefixes = ['/api/admissions', '/api/contact'];
const sensitiveMethods = ['GET', 'PATCH', 'DELETE'];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  
  const isProtectedApi = protectedApiPrefixes.some(prefix => path.startsWith(prefix)) && 
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
    } catch (error) {
      if (isProtectedApi) {
        return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admissions/:path*',
    '/api/contact/:path*',
  ],
};
