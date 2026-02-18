
// ============================================================
// app/admin/login/page.js — ВХОД В АДМИНКУ
// ============================================================
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [pwd, setPwd] = useState('')
  const [err, setErr] = useState(false)
  const router = useRouter()

  const login = async () => {
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      body: JSON.stringify({ password: pwd }),
      headers: { 'Content-Type': 'application/json' },
    })
    if (res.ok) router.push('/admin')
    else setErr(true)
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-24 text-center">
      <h1 className="text-2xl font-bold text-pink-800 mb-6">Вход в админку</h1>
      <input
        type="password"
        className="w-full border border-pink-200 rounded-xl px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
        placeholder="Пароль"
        value={pwd}
        onChange={e => setPwd(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && login()}
      />
      {err && <p className="text-red-400 text-sm mb-3">Неверный пароль</p>}
      <button onClick={login} className="w-full bg-pink-600 text-white font-semibold py-3 rounded-xl hover:bg-pink-800 transition-colors">
        Войти
      </button>
    </div>
  )
}
