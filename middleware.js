
// ============================================================
// middleware.js — ЗАЩИТА /admin
// ============================================================
import { NextResponse } from 'next/server'

export function middleware(req) {
  const { pathname } = req.nextUrl
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = req.cookies.get('admin_token')
    if (token?.value !== process.env.ADMIN_PASSWORD) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }
}

export const config = { matcher: ['/admin/:path*'] }
