import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Restringe /configuracion a usuarios admin.
 * Admin se identifica por cookie `admin=1`.
 * La cookie se setea desde /admin con PIN.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/configuracion')) {
    const isAdmin = req.cookies.get('admin')?.value === '1'
    if (!isAdmin) {
      const url = req.nextUrl.clone()
      url.pathname = '/admin'
      url.searchParams.set('next', pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/configuracion/:path*'],
}
