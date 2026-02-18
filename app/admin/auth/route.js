
// ============================================================
// app/api/admin/auth/route.js — API авторизации
// ============================================================
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req) {
  const { password } = await req.json()
  if (password !== process.env.ADMIN_PASSWORD)
    return NextResponse.json({ error: 'Wrong password' }, { status: 401 })
  const res = NextResponse.json({ ok: true })
  res.cookies.set('admin_token', process.env.ADMIN_PASSWORD, { httpOnly: true, maxAge: 60 * 60 * 24 * 7 })
  return res
}
