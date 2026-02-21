// lib/posts.js
// Читает статьи напрямую из GitHub API — работает на Vercel в runtime

const REPO = process.env.GITHUB_REPO // oxionezhkov-hub/whatafaaanfic-blog
const TOKEN = process.env.GITHUB_TOKEN
const DIR = 'content/posts'

const ghHeaders = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: 'application/vnd.github+json',
}

function parseTxt(raw) {
  const lines = raw.split('\n')
  if (lines[0].trim() !== '---') return null
  const meta = {}
  let i = 1
  while (i < lines.length && lines[i].trim() !== '---') {
    const colonIdx = lines[i].indexOf(':')
    if (colonIdx > -1) {
      const key = lines[i].slice(0, colonIdx).trim()
      const val = lines[i].slice(colonIdx + 1).trim()
      meta[key] = val
    }
    i++
  }
  const content = lines.slice(i + 1).join('\n').trim()
  return { ...meta, content }
}

export async function getPosts(limit) {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${DIR}`,
      { headers: ghHeaders, next: { revalidate: 60 } }
    )
    if (!res.ok) return []
    const files = await res.json()
    const txts = files.filter(f => f.name.endsWith('.txt'))

    const posts = await Promise.all(
      txts.map(async (f) => {
        const r = await fetch(f.download_url, { next: { revalidate: 60 } })
        const raw = await r.text()
        return parseTxt(raw)
      })
    )

    return posts
      .filter(Boolean)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit || undefined)
  } catch (e) {
    console.error('getPosts error:', e)
    return []
  }
}

export async function getPost(slug) {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${DIR}/${slug}.txt`,
      { headers: ghHeaders, next: { revalidate: 60 } }
    )
    if (!res.ok) return null
    const file = await res.json()
    const raw = Buffer.from(file.content, 'base64').toString('utf8')
    return parseTxt(raw)
  } catch (e) {
    console.error('getPost error:', e)
    return null
  }
}
