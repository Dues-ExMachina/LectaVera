import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const token = request.cookies.get('access_token')?.value;
    const localStorageToken =
        request.headers.get('Authorization')?.replace('Bearer ', '') || null;
    const { pathname } = request.nextUrl;

    const publicRoutes = ['/login', '/signup', '/forgot-password', '/reset-password'];
    const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
    const isRoot = pathname === '/';

    // Redirect root to dashboard or login
    if (isRoot) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
