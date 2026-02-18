
// ============================================================
// components/StickyBar.jsx — ПЛАВАЮЩАЯ ПОЛОСКА СВЕРХУ
// ============================================================
'use client'
import { useState, useEffect } from 'react'

export default function StickyBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-pink-600 text-white text-sm font-medium flex items-center justify-center gap-4 py-2 shadow-md">
      <span>✨ Создай свой фанфик за 30 секунд — бесплатно</span>
      <a
        href="https://t.me/whatafaaanfic_bot?utm_source=blog&utm_medium=sticky_bar&utm_campaign=fanfic_bot"
        target="_blank"
        className="bg-white text-pink-600 font-bold px-3 py-0.5 rounded-full text-xs hover:bg-pink-50 transition-colors"
      >
        Попробовать →
      </a>
    </div>
  )
}
