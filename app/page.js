
// ============================================================
// app/page.js — ГЛАВНАЯ
// ============================================================
import { getPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export const metadata = {
  title: 'WhataFaaanfic — ИИ-генератор фанфиков',
  description: 'Создай фанфик по любимому аниме, сериалу или фильму за 30 секунд. Нейросеть пишет за тебя.',
}

const BOT_URL = 'https://t.me/whatafaaanfic_bot'

export default async function HomePage() {
  const posts = await getPosts(3)

  return (
    <>
      {/* HERO */}
      <section className="max-w-5xl mx-auto px-4 pt-16 pb-12 text-center">
        <div className="inline-block bg-pink-100 text-pink-600 text-sm font-medium px-3 py-1 rounded-full mb-4">
          🤖 На основе нейросети Gemini AI
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-pink-800 leading-tight mb-4">
          Фанфики по любимым <br className="hidden md:block" />
          аниме и сериалам — за 30 секунд
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
          Введи название вселенной, персонажей и задумку — нейросеть напишет уникальный фанфик прямо в Telegram.
          Гарри Поттер, Атака Титанов, Очень странные дела — любая вселенная.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`${BOT_URL}?utm_source=blog&utm_medium=hero_cta&utm_campaign=fanfic_bot`}
            target="_blank"
            className="bg-pink-600 text-white font-semibold px-8 py-3 rounded-full text-lg hover:bg-pink-800 transition-colors shadow-md"
          >
            ✨ Создать фанфик бесплатно
          </a>
          <a
            href="/demo"
            className="bg-white text-pink-600 border border-pink-300 font-semibold px-8 py-3 rounded-full text-lg hover:bg-pink-50 transition-colors"
          >
            Посмотреть демо →
          </a>
        </div>
      </section>

      {/* КАК ЭТО РАБОТАЕТ */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center text-pink-800 mb-8">Как это работает</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { step: '1', icon: '🎬', title: 'Выбери вселенную', desc: 'Напиши название аниме, сериала или фильма' },
            { step: '2', icon: '🧑‍🤝‍🧑', title: 'Укажи персонажей', desc: 'Выбери героев и добавь задумку по желанию' },
            { step: '3', icon: '📖', title: 'Получи фанфик', desc: 'Нейросеть пишет уникальную историю за 30 секунд' },
          ].map(({ step, icon, title, desc }) => (
            <div key={step} className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100 text-center">
              <div className="text-3xl mb-3">{icon}</div>
              <div className="text-xs font-bold text-pink-400 uppercase mb-1">Шаг {step}</div>
              <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ПРИМЕРЫ ИЗ БЛОГА */}
      {posts.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-pink-800 mb-6">Из блога</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map(p => <PostCard key={p.slug} post={p} />)}
          </div>
          <div className="text-center mt-8">
            <a href="/blog" className="text-pink-600 font-medium hover:underline">Все статьи →</a>
          </div>
        </section>
      )}
    </>
  )
}
