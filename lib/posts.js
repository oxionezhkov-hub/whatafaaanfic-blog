
// ============================================================
// lib/posts.js — ЧТЕНИЕ СТАТЕЙ ИЗ ФАЙЛОВОЙ СИСТЕМЫ
// ============================================================
import fs from 'fs'
import path from 'path'

const DIR = path.join(process.cwd(), 'content', 'posts')

export async function getPosts(limit) {
  if (!fs.existsSync(DIR)) return []
  const files = fs.readdirSync(DIR).filter(f => f.endsWith('.json'))
  const posts = files
    .map(f => JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
  return limit ? posts.slice(0, limit) : posts
}

export async function getPost(slug) {
  const file = path.join(DIR, `${slug}.json`)
  if (!fs.existsSync(file)) return null
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}
