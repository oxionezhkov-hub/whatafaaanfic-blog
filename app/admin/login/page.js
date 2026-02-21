'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [pwd, setPwd] = useState('')
  const [err, setErr] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const login = async () => {
    if (!pwd.trim()) return
    setLoading(true)
    setErr(false)
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        body: JSON.stringify({ password: pwd }),
        headers: { 'Content-Type': 'application/json' },
      })
      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        setErr(true)
      }
    } catch {
      setErr(true)
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ background: '#fff', borderRadius: '24px', padding: '2.5rem 2rem', width: '100%', maxWidth: '380px', border: '1px solid #F4A7B9', boxShadow: '0 4px 24px #E8728A18' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔐</div>
          <h1 style={{ fontWeight: 900, fontSize: '1.5rem', color: '#8B1A3A', margin: 0 }}>Вход в админку</h1>
          <p style={{ color: '#aaa', fontSize: '0.85rem', marginTop: '0.4rem' }}>WhataFaaanfic Blog</p>
        </div>

        <input
          type="password"
          placeholder="Пароль"
          value={pwd}
          onChange={e => { setPwd(e.target.value); setErr(false) }}
          onKeyDown={e => e.key === 'Enter' && login()}
          style={{ width: '100%', border: `2px solid ${err ? '#e57373' : '#F4A7B9'}`, borderRadius: '12px', padding: '12px 16px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box', marginBottom: '0.5rem', fontFamily: 'inherit' }}
        />

        {err && (
          <p style={{ color: '#e57373', fontSize: '0.85rem', marginBottom: '0.8rem', textAlign: 'center' }}>
            Неверный пароль
          </p>
        )}

        <button
          onClick={login}
          disabled={loading || !pwd.trim()}
          style={{ width: '100%', background: 'linear-gradient(135deg, #E8728A, #C2185B)', color: '#fff', fontWeight: 800, fontSize: '1rem', padding: '13px', borderRadius: '50px', border: 'none', cursor: pwd.trim() ? 'pointer' : 'default', opacity: loading ? 0.7 : 1, marginTop: '0.5rem', fontFamily: 'inherit' }}
        >
          {loading ? 'Проверяю...' : 'Войти →'}
        </button>
      </div>
    </div>
  )
}
