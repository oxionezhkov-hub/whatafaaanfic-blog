
// ============================================================
// app/demo/page.js — ДЕМО-ГЕНЕРАТОР
// ============================================================
'use client'
import { useState } from 'react'

const BOT_URL = 'https://t.me/whatafaaanfic_bot'
const STEPS = ['universe', 'characters', 'plot', 'loading', 'result']

const loadingMessages = [
  '🔍 Изучаю персонажей...',
  '✍️ Придумываю сюжет...',
  '💡 Добавляю неожиданный поворот...',
  '📖 Оформляю историю...',
  '✨ Последние штрихи...',
]

export default function DemoPage() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState({ universe: '', characters: '', plot: '' })
  const [loadMsg, setLoadMsg] = useState(0)
  const [progress, setProgress] = useState(0)

  const startLoading = () => {
    setStep(3)
    let p = 0, m = 0
    const iv = setInterval(() => {
      p += 10
      if (p % 20 === 0 && m < loadingMessages.length - 1) m++
      setProgress(p)
      setLoadMsg(m)
      if (p >= 100) { clearInterval(iv); setStep(4) }
    }, 1000)
  }

  const utmBot = `${BOT_URL}?utm_source=blog&utm_medium=demo&utm_campaign=fanfic_bot`

  return (
    <div className="max-w-lg mx-auto px-4 py-16">
      <h1 className="text-3xl font-extrabold text-pink-800 text-center mb-2">Попробуй демо</h1>
      <p className="text-center text-gray-500 mb-10 text-sm">Введи данные — и посмотри как работает генератор</p>

      <div className="bg-white rounded-3xl shadow-md border border-pink-100 p-8">

        {/* ШАГ 0 — Вселенная */}
        {step === 0 && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">🎬 Название аниме, сериала или фильма</label>
            <input
              className="w-full border border-pink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Наруто, Гарри Поттер, Игра Престолов..."
              value={data.universe}
              onChange={e => setData({ ...data, universe: e.target.value })}
            />
            <button
              disabled={!data.universe.trim()}
              onClick={() => setStep(1)}
              className="w-full mt-4 bg-pink-600 text-white font-semibold py-3 rounded-xl disabled:opacity-40 hover:bg-pink-800 transition-colors"
            >
              Далее →
            </button>
          </div>
        )}

        {/* ШАГ 1 — Персонажи */}
        {step === 1 && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">🧑‍🤝‍🧑 Персонажи (через запятую)</label>
            <input
              className="w-full border border-pink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Наруто и Саске, Гермиона..."
              value={data.characters}
              onChange={e => setData({ ...data, characters: e.target.value })}
            />
            <button
              disabled={!data.characters.trim()}
              onClick={() => setStep(2)}
              className="w-full mt-4 bg-pink-600 text-white font-semibold py-3 rounded-xl disabled:opacity-40 hover:bg-pink-800 transition-colors"
            >
              Далее →
            </button>
          </div>
        )}

        {/* ШАГ 2 — Задумка */}
        {step === 2 && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">💡 Задумка (необязательно)</label>
            <textarea
              rows={3}
              className="w-full border border-pink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
              placeholder="Например: встреча после 10 лет разлуки..."
              value={data.plot}
              onChange={e => setData({ ...data, plot: e.target.value })}
            />
            <button
              onClick={startLoading}
              className="w-full mt-4 bg-pink-600 text-white font-semibold py-3 rounded-xl hover:bg-pink-800 transition-colors"
            >
              ✨ Создать фанфик
            </button>
            <button onClick={() => startLoading()} className="w-full mt-2 text-sm text-gray-400 hover:text-pink-600">
              Пропустить — придумай сам
            </button>
          </div>
        )}

        {/* ШАГ 3 — Загрузка */}
        {step === 3 && (
          <div className="text-center py-4">
            <div className="text-4xl mb-4 animate-bounce">✍️</div>
            <p className="font-semibold text-gray-700 mb-1">Генерирую фанфик...</p>
            <p className="text-sm text-pink-500 mb-6 h-5">{loadingMessages[loadMsg]}</p>
            <div className="w-full bg-pink-100 rounded-full h-2">
              <div
                className="bg-pink-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">{progress}%</p>
          </div>
        )}

        {/* ШАГ 4 — Результат */}
        {step === 4 && (
          <div className="text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-xl font-extrabold text-pink-800 mb-2">Твой фанфик готов!</h2>
            <p className="text-gray-500 text-sm mb-2">
              История про <span className="font-semibold text-pink-600">{data.characters}</span> из вселенной <span className="font-semibold text-pink-600">{data.universe}</span> уже ждёт тебя в боте.
            </p>
            <p className="text-xs text-gray-400 mb-6">Полный текст доступен в Telegram — бесплатно</p>
            <a
              href={utmBot}
              target="_blank"
              className="block w-full bg-pink-600 text-white font-bold py-4 rounded-2xl text-lg hover:bg-pink-800 transition-colors shadow-lg"
            >
              📖 Читать в боте →
            </a>
            <button
              onClick={() => { setStep(0); setData({ universe: '', characters: '', plot: '' }); setProgress(0) }}
              className="mt-4 text-sm text-gray-400 hover:text-pink-500"
            >
              Попробовать ещё раз
            </button>
          </div>
        )}
      </div>

      {/* Индикатор прогресса шагов */}
      {step < 3 && (
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2].map(i => (
            <div key={i} className={`h-1.5 w-10 rounded-full transition-colors ${i <= step ? 'bg-pink-600' : 'bg-pink-200'}`} />
          ))}
        </div>
      )}
    </div>
  )
}
