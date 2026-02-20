import fs from 'fs'
import path from 'path'

const DIR = path.join(process.cwd(), 'content', 'posts')

// Парсит TXT-файл с YAML-шапкой
// Формат файла:
// ---
// title: Заголовок статьи
// slug: url-statyi
// description: Мета-описание 140-160 символов
// category: anime | serials | films | ai
// date: 2026-02-18
// coverUrl: https://...
// universeTag: Наруто
// ---
// <p>HTML-контент статьи...</p>

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
  if (!fs.existsSync(DIR)) return []
  const files = fs.readdirSync(DIR).filter(f => f.endsWith('.txt'))
  const posts = files
    .map(f => parseTxt(fs.readFileSync(path.join(DIR, f), 'utf8')))
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
  return limit ? posts.slice(0, limit) : posts
}

export async function getPost(slug) {
  const file = path.join(DIR, `${slug}.txt`)
  if (!fs.existsSync(file)) return null
  return parseTxt(fs.readFileSync(file, 'utf8'))
}
