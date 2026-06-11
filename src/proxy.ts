import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  
  // Protect all routes under /admin
  if (req.nextUrl.pathname.startsWith('/admin')) {
    // Read password from environment, with a fallback just in case
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (!authHeader) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Secure Admin Area"' },
      });
    }

    try {
      // Decode base64 auth header (format: "Basic dXNlcjpwYXNz")
      const auth = atob(authHeader.split(' ')[1]).split(':');
      const user = auth[0];
      const pass = auth[1];

      // Check credentials (username is always "admin")
      if (user === 'admin' && pass === adminPassword) {
        return NextResponse.next();
      }
    } catch (e) {
      // Ignore parsing errors and fall through to unauthorized
    }

    return new NextResponse('Invalid credentials', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Admin Area"' },
    });
  }
  
  return NextResponse.next();
}

export const config = {
  // Only run the middleware on admin routes to save performance
  matcher: ['/admin/:path*'],
};
