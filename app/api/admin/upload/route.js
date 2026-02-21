import { NextResponse } from 'next/server'

export async function POST(req) {
  // Проверка пароля
  const authHeader = req.headers.get('x-admin-password')
  if (authHeader !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get('file')
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

  const text = await file.text()

  // Парсим slug
  const slugMatch = text.match(/^slug:\s*(.+)$/m)
  if (!slugMatch) return NextResponse.json({ error: 'No slug in file' }, { status: 400 })
  const slug = slugMatch[1].trim()

  // Кодируем содержимое в base64
  const content = Buffer.from(text, 'utf8').toString('base64')
  const filePath = `content/posts/${slug}.txt`
  const repo = process.env.GITHUB_REPO // например: oxionezhkov-hub/whatafaaanfic-blog
  const token = process.env.GITHUB_TOKEN

  // Проверяем, существует ли файл уже (чтобы получить sha для обновления)
  let sha = undefined
  const checkRes = await fetch(
    `https://api.github.com/repos/${repo}/contents/${filePath}`,
    { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' } }
  )
  if (checkRes.ok) {
    const existing = await checkRes.json()
    sha = existing.sha
  }

  // Создаём или обновляем файл через GitHub API
  const body = {
    message: `Add post: ${slug}`,
    content,
    ...(sha ? { sha } : {}),
  }

  const uploadRes = await fetch(
    `https://api.github.com/repos/${repo}/contents/${filePath}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  )

  if (!uploadRes.ok) {
    const err = await uploadRes.json()
    console.error('GitHub API error:', err)
    return NextResponse.json({ error: 'GitHub upload failed', detail: err }, { status: 500 })
  }

  return NextResponse.json({ ok: true, slug })
}
