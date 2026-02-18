
// ============================================================
// components/Popup.jsx — ПОПАП ЧЕРЕЗ 5 СЕКУНД
// ============================================================
'use client'
import { useState, useEffect } from 'react'

const BOT_URL = 'https://t.me/whatafaaanfic_bot'

export default function Popup({ universe }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem('popup_seen')
    if (seen) return
    const t = setTimeout(() => setShow(true), 5000)
    return () => clearTimeout(t)
  }, [])

  const close = () => {
    localStorage.setItem('popup_seen', '1')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={close}>
      <div
        className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center relative"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={close} className="absolute top-4 right-4 text-gray-300 hover:text-gray-500 text-xl">✕</button>
        <div className="text-5xl mb-4">📖</div>
        <h2 className="text-xl font-extrabold text-pink-800 mb-2">
          Хочешь фанфик{universe ? ` по «${universe}»` : ''}?
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Нейросеть напишет уникальную историю по твоим персонажам за 30 секунд. Бесплатно!
        </p>
        <a
          href={`${BOT_URL}?utm_source=blog&utm_medium=popup&utm_campaign=fanfic_bot`}
          target="_blank"
          onClick={close}
          className="block w-full bg-pink-600 text-white font-bold py-3 rounded-2xl hover:bg-pink-800 transition-colors"
        >
          ✨ Создать фанфик
        </a>
        <button onClick={close} className="mt-3 text-xs text-gray-400 hover:text-gray-600">Не сейчас</button>
      </div>
    </div>
  )
}
