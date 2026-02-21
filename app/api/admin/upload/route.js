import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req) {
  // Проверка пароля через заголовок
  const authHeader = req.headers.get('x-admin-password')
  if (authHeader !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get('file')
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

  const text = await file.text()

  // Парсим slug из шапки
  const slugMatch = text.match(/^slug:\s*(.+)$/m)
  if (!slugMatch) return NextResponse.json({ error: 'No slug in file' }, { status: 400 })
  const slug = slugMatch[1].trim()

  // Сохраняем файл
  const dir = path.join(process.cwd(), 'content', 'posts')
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, `${slug}.txt`), text, 'utf8')

  return NextResponse.json({ ok: true, slug })
}
