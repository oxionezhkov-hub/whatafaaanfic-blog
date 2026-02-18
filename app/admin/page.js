
// ============================================================
// app/admin/page.js — ЗАГРУЗКА СТАТЬИ
// ============================================================
'use client'
import { useState } from 'react'

const CATEGORIES = ['anime', 'serials', 'films', 'ai']

export default function AdminPage() {
  const [form, setForm] = useState({ title: '', slug: '', description: '', category: 'anime', date: new Date().toISOString().slice(0, 10), coverUrl: '', universeTag: '', content: '' })
  const [status, setStatus] = useState(null)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const autoSlug = (title) => title.toLowerCase().replace(/[^a-zа-яё0-9\s]/gi, '').replace(/\s+/g, '-').replace(/[а-яё]/gi, c => ({ а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'yo',ж:'zh',з:'z',и:'i',й:'j',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'h',ц:'ts',ч:'ch',ш:'sh',щ:'sch',ъ:'',ы:'y',ь:'',э:'e',ю:'yu',я:'ya' }[c] || c))

  const submit = async () => {
    setStatus('loading')
    const res = await fetch('/api/admin/post', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    })
    setStatus(res.ok ? 'ok' : 'err')
  }

  const field = (label, key, type = 'text', opts = {}) => (
    <div key={key}>
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      {type === 'textarea'
        ? <textarea rows={opts.rows || 4} className="w-full border border-pink-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 resize-y" value={form[key]} onChange={e => set(key, e.target.value)} />
        : <input type={type} className="w-full border border-pink-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" value={form[key]} onChange={e => set(key, e.target.value)} />
      }
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-pink-800 mb-8">Добавить статью</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-8 flex flex-col gap-5">
        {field('Заголовок (H1)', 'title')}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Slug (URL)</label>
          <div className="flex gap-2">
            <input className="flex-1 border border-pink-200 rounded-xl px-3 py-2 text-sm focus:outline-none" value={form.slug} onChange={e => set('slug', e.target.value)} />
            <button onClick={() => set('slug', autoSlug(form.title))} className="bg-pink-100 text-pink-700 px-3 py-2 rounded-xl text-xs font-medium hover:bg-pink-200">
              Авто
            </button>
          </div>
        </div>
        {field('Meta description (140-160 символов)', 'description', 'textarea', { rows: 3 })}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Категория</label>
          <select className="w-full border border-pink-200 rounded-xl px-3 py-2 text-sm focus:outline-none" value={form.category} onChange={e => set('category', e.target.value)}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        {field('Дата публикации', 'date', 'date')}
        {field('URL обложки', 'coverUrl')}
        {field('Тег вселенной (для попапа)', 'universeTag')}
        {field('Контент статьи (HTML)', 'content', 'textarea', { rows: 12 })}

        <button
          onClick={submit}
          disabled={!form.title || !form.slug || !form.content}
          className="bg-pink-600 text-white font-bold py-3 rounded-xl hover:bg-pink-800 transition-colors disabled:opacity-40"
        >
          {status === 'loading' ? 'Сохраняю...' : '💾 Опубликовать статью'}
        </button>
        {status === 'ok' && <p className="text-green-500 text-center text-sm">✅ Статья опубликована!</p>}
        {status === 'err' && <p className="text-red-400 text-center text-sm">Ошибка. Попробуй ещё раз.</p>}
      </div>
    </div>
  )
}
