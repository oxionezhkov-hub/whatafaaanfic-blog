import { getPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export const metadata = {
  title: 'WhataFaaanfic — ИИ-генератор фанфиков',
  description: 'Создай фанфик по любимым героям за 30 секунд. Фильмы, сериалы, игры — нейросеть напишет уникальную историю.',
}

const BOT_URL = 'https://t.me/fanfic_ai_bot'

export default async function HomePage() {
  const posts = await getPosts(3)

  return (
    <>
      {/* HERO */}
      <section style={{ background: 'linear-gradient(160deg, #FFF0F5 0%, #FFE4EC 100%)', padding: '5rem 1rem 4rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: '#FFD6E3', color: '#C2185B', fontSize: '0.8rem', fontWeight: 700, padding: '4px 14px', borderRadius: '50px', marginBottom: '1.2rem', letterSpacing: '0.5px' }}>
            🤖 На основе нейросети Gemini AI
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: '#8B1A3A', lineHeight: 1.2, marginBottom: '1rem' }}>
            Создай фанфик, который будет<br />
            <span style={{ color: '#C2185B' }}>интересен именно тебе</span> 💕
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#666', lineHeight: 1.7, marginBottom: '0.8rem' }}>
            Фильмы, сериалы, игры — любимые герои окажутся в новых приключениях,<br />
            завяжут роман или будут весь день лежать на диване
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start', maxWidth: '360px', margin: '0 auto 2rem', background: '#fff', borderRadius: '16px', padding: '1.2rem 1.5rem', boxShadow: '0 2px 16px #E8728A22', textAlign: 'left', fontSize: '0.95rem', color: '#444', lineHeight: 1.8 }}>
            <div>1) Напиши название вселенной</div>
            <div>2) Выбери героев</div>
            <div>3) Предложи задумку и жанр</div>
            <div style={{ marginTop: '0.4rem', fontWeight: 700, color: '#C2185B' }}>🤗 Через 10 секунд получи...</div>
            <div style={{ color: '#555', fontSize: '0.9rem' }}>Идеальный фанфик с живыми диалогами, эмоциями и драйвом</div>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={`${BOT_URL}?utm_source=blog&utm_medium=hero_primary&utm_campaign=fanfic_bot`}
              target="_blank"
              style={{ background: 'linear-gradient(135deg, #E8728A, #C2185B)', color: '#fff', fontWeight: 800, fontSize: '1.05rem', padding: '14px 32px', borderRadius: '50px', textDecoration: 'none', boxShadow: '0 4px 20px #C2185B44' }}
            >
              ✨ Создать фанфик бесплатно
            </a>
            <a
              href="/demo"
              style={{ background: '#fff', color: '#C2185B', border: '2px solid #E8728A', fontWeight: 700, fontSize: '1rem', padding: '14px 28px', borderRadius: '50px', textDecoration: 'none' }}
            >
              Посмотреть демо →
            </a>
          </div>
        </div>
      </section>

      {/* КАК ЭТО РАБОТАЕТ */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 1rem' }}>
        <h2 style={{ textAlign: 'center', fontWeight: 900, fontSize: '1.7rem', color: '#8B1A3A', marginBottom: '2.5rem' }}>
          Как это работает
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
          {[
            { icon: '🎬', step: '01', title: 'Выбери вселенную', desc: 'Напиши название аниме, сериала, фильма или игры' },
            { icon: '🧑‍🤝‍🧑', step: '02', title: 'Укажи персонажей', desc: 'Выбери героев и добавь задумку или жанр по желанию' },
            { icon: '📖', step: '03', title: 'Получи фанфик', desc: 'Нейросеть напишет уникальную историю за 10 секунд' },
          ].map(({ icon, step, title, desc }) => (
            <div key={step} style={{ background: '#fff', borderRadius: '20px', padding: '1.8rem', border: '1px solid #F4A7B9', textAlign: 'center' }}>
              <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>{icon}</div>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#E8728A', letterSpacing: '1px', marginBottom: '0.4rem' }}>ШАГ {step}</div>
              <div style={{ fontWeight: 800, color: '#2d2d2d', marginBottom: '0.5rem' }}>{title}</div>
              <div style={{ fontSize: '0.88rem', color: '#777', lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* БЛОГ */}
      {posts.length > 0 && (
        <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem 4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontWeight: 900, fontSize: '1.5rem', color: '#8B1A3A' }}>Из блога</h2>
            <a href="/blog" style={{ color: '#C2185B', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }}>Все статьи →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem' }}>
            {posts.map(p => <PostCard key={p.slug} post={p} />)}
          </div>
        </section>
      )}
    </>
  )
}
