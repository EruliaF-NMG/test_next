import { chain } from '@/middlewares/chain'
import { authMiddleware } from '@/middlewares/auth-middleware'
import { adminMiddleware } from '@/middlewares/admin-middleware'

export default chain([authMiddleware, adminMiddleware])

export const config = {
  //matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
  matcher:['/admin/:path*','/post/create','/post/edit/:path*']
}