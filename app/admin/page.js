'use client'
import { useState } from 'react'

export default function AdminPage() {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState(null)
  const [preview, setPreview] = useState('')

  const onFile = (e) => {
    const f = e.target.files[0]
    if (!f) return
    setFile(f)
    setStatus(null)
    const reader = new FileReader()
    reader.onload = (ev) => setPreview(ev.target.result)
    reader.readAsText(f, 'utf-8')
  }

  const upload = async () => {
    if (!file) return
    setStatus('loading')
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
    setStatus(res.ok ? 'ok' : 'err')
    if (res.ok) { setFile(null); setPreview('') }
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem 1rem' }}>
      <h1 style={{ fontWeight: 900, fontSize: '1.8rem', color: '#8B1A3A', marginBottom: '0.5rem' }}>
        Добавить статью
      </h1>
      <p style={{ color: '#888', marginBottom: '2rem', fontSize: '0.9rem' }}>
        Загрузи TXT-файл в правильном формате — статья появится на сайте автоматически
      </p>

      {/* Формат */}
      <div style={{ background: '#FFF5F7', border: '1px solid #F4A7B9', borderRadius: '16px', padding: '1.2rem 1.5rem', marginBottom: '2rem', fontSize: '0.82rem', fontFamily: 'monospace', lineHeight: 1.9, color: '#555' }}>
        <div style={{ fontWeight: 700, color: '#C2185B', marginBottom: '0.5rem', fontFamily: 'Nunito, sans-serif' }}>Формат файла:</div>
        ---<br />
        title: Заголовок статьи<br />
        slug: url-statyi-cherez-defis<br />
        description: Мета-описание 140–160 символов<br />
        category: anime<br />
        date: 2026-02-18<br />
        coverUrl: https://ссылка-на-обложку.jpg<br />
        universeTag: Наруто<br />
        ---<br />
        &lt;p&gt;Текст статьи в HTML...&lt;/p&gt;
      </div>

      {/* Загрузка */}
      <label style={{ display: 'block', border: '2px dashed #E8728A', borderRadius: '16px', padding: '2.5rem', textAlign: 'center', cursor: 'pointer', background: file ? '#FFF0F5' : '#fff', transition: 'background 0.2s' }}>
        <input type="file" accept=".txt" onChange={onFile} style={{ display: 'none' }} />
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📄</div>
        <div style={{ fontWeight: 700, color: '#C2185B', marginBottom: '0.3rem' }}>
          {file ? file.name : 'Нажми или перетащи TXT-файл'}
        </div>
        <div style={{ fontSize: '0.8rem', color: '#aaa' }}>только .txt</div>
      </label>

      {/* Превью */}
      {preview && (
        <details style={{ marginTop: '1rem' }}>
          <summary style={{ cursor: 'pointer', color: '#C2185B', fontWeight: 700, fontSize: '0.9rem' }}>Предпросмотр файла</summary>
          <pre style={{ marginTop: '0.8rem', background: '#f8f8f8', borderRadius: '12px', padding: '1rem', fontSize: '0.78rem', overflowX: 'auto', maxHeight: '200px', color: '#444' }}>{preview}</pre>
        </details>
      )}

      <button
        onClick={upload}
        disabled={!file || status === 'loading'}
        style={{ width: '100%', marginTop: '1.5rem', background: file ? 'linear-gradient(135deg, #E8728A, #C2185B)' : '#ddd', color: '#fff', fontWeight: 800, fontSize: '1rem', padding: '14px', borderRadius: '50px', border: 'none', cursor: file ? 'pointer' : 'default', transition: 'opacity 0.2s' }}
      >
        {status === 'loading' ? 'Публикую...' : '💾 Опубликовать статью'}
      </button>

      {status === 'ok' && (
        <div style={{ marginTop: '1rem', background: '#e8f5e9', color: '#2e7d32', borderRadius: '12px', padding: '0.8rem 1rem', textAlign: 'center', fontWeight: 700 }}>
          ✅ Статья опубликована! <a href="/blog" style={{ color: '#C2185B', marginLeft: '8px' }}>Открыть блог →</a>
        </div>
      )}
      {status === 'err' && (
        <div style={{ marginTop: '1rem', background: '#fdecea', color: '#c62828', borderRadius: '12px', padding: '0.8rem 1rem', textAlign: 'center', fontWeight: 700 }}>
          ❌ Ошибка. Проверь формат файла и попробуй снова.
        </div>
      )}
    </div>
  )
}
