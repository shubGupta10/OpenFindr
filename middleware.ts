import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const publicRoutes = ['/']; 

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    if (publicRoutes.includes(pathname)) {
      return NextResponse.next();
    }

    if (pathname.startsWith('/api/auth')) {
      return NextResponse.next();
    }

    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: '/',
    },
  }
);

export const config = {
  matcher: [ '/pages/repos', '/pages/beginner-repos', '/pages/fetch-saved-repos'], 
};
