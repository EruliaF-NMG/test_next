import {
    NextResponse,
    type NextFetchEvent,
    type NextRequest,
    NextMiddleware
  } from 'next/server'
  
import { CustomMiddleware } from './chain'
import { getToken } from 'next-auth/jwt';
  
  export function authMiddleware(middleware: NextMiddleware) {
    return async (request: NextRequest, event: NextFetchEvent) => {
        if (request.nextUrl.pathname.startsWith('/post')) {
            const session = await getToken({ req: request, secret: process.env.NEXT_AUTH_SECRET });
            if(!session) return NextResponse.redirect(new URL('/',request.url));
        }
      return middleware(request, event)
    }
  }