import { getPost, getPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Popup from '@/components/Popup'
import GiftBlock from '@/components/GiftBlock'

// Позволяет отдавать страницы для slug-ов которых не было при билде
export const dynamicParams = true

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.coverUrl ? [post.coverUrl] : [],
    },
  }
}

const INLINE_CTA = `
<div style="background:#FFF5F7;border:1px solid #F4A7B9;border-radius:16px;padding:20px;margin:32px 0;text-align:center">
  <p style="margin:0 0 8px;font-weight:800;color:#8B1A3A;font-size:1.05rem">✨ Хочешь свой фанфик прямо сейчас?</p>
  <p style="margin:0 0 16px;color:#666;font-size:0.9rem">Нейросеть напишет историю по твоим персонажам за 10 секунд — бесплатно</p>
  <a href="https://t.me/fanfic_ai_bot?utm_source=blog&utm_medium=inline_cta&utm_campaign=fanfic_bot"
     target="_blank"
     style="background:linear-gradient(135deg,#E8728A,#C2185B);color:#fff;font-weight:800;padding:12px 28px;border-radius:50px;text-decoration:none;display:inline-block">
    Создать фанфик →
  </a>
</div>`

function injectCTA(html) {
  let count = 0
  return html.replace(/<\/p>/g, match => {
    count++
    return count === 3 ? `</p>${INLINE_CTA}` : match
  })
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  const contentWithCTA = injectCTA(post.content)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.coverUrl || '',
    datePublished: post.date,
    publisher: {
      '@type': 'Organization',
      name: 'WhataFaaanfic',
      url: 'https://whatafaaanfic-blog.vercel.app',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Popup universe={post.universeTag} />

      <article style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 1rem' }}>
        {/* Breadcrumb */}
        <nav style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: '1.5rem' }}>
          <a href="/" style={{ color: '#C2185B', textDecoration: 'none' }}>Главная</a>
          {' / '}
          <a href="/blog" style={{ color: '#C2185B', textDecoration: 'none' }}>Блог</a>
          {' / '}
          <span>{post.title}</span>
        </nav>

        {/* Обложка */}
        {post.coverUrl && (
          <img
            src={post.coverUrl}
            alt={post.title}
            style={{ width: '100%', borderRadius: '20px', marginBottom: '2rem', maxHeight: '320px', objectFit: 'cover' }}
          />
        )}

        {/* Заголовок */}
        <h1 style={{ fontWeight: 900, fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', color: '#8B1A3A', lineHeight: 1.25, marginBottom: '0.8rem' }}>
          {post.title}
        </h1>

        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', fontSize: '0.82rem', color: '#aaa', marginBottom: '2.5rem' }}>
          <span>
            {new Date(post.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
          {post.category && (
            <span style={{ background: '#FFE4EC', color: '#C2185B', padding: '2px 10px', borderRadius: '50px', fontWeight: 700 }}>
              {post.category}
            </span>
          )}
        </div>

        {/* Контент */}
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: contentWithCTA }}
        />

        {/* Подарок снизу */}
        <GiftBlock universe={post.universeTag} />
      </article>
    </>
  )
}
