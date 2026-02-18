
// ============================================================
// app/api/admin/post/route.js — API сохранения статьи
// ============================================================
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import fs from 'fs'
import path from 'path'

export async function POST(req) {
  const token = cookies().get('admin_token')
  if (token?.value !== process.env.ADMIN_PASSWORD)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const post = await req.json()
  const dir = path.join(process.cwd(), 'content', 'posts')
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, `${post.slug}.json`), JSON.stringify(post, null, 2))
  return NextResponse.json({ ok: true })
}
