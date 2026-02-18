
// ============================================================
// app/blog/[slug]/page.js — СТАТЬЯ
// ============================================================
import { getPost, getPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Popup from '@/components/Popup'
import GiftBlock from '@/components/GiftBlock'

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
    openGraph: { title: post.title, description: post.description, images: [post.coverUrl] },
  }
}

const INLINE_CTA = `
<div style="background:#FFF5F7;border:1px solid #F4A7B9;border-radius:16px;padding:20px;margin:32px 0;text-align:center">
  <p style="margin:0 0 12px;font-weight:700;color:#8B1A3A;font-size:1.05rem">✨ Хочешь свой фанфик прямо сейчас?</p>
  <p style="margin:0 0 16px;color:#666;font-size:0.9rem">Нейросеть напишет историю по твоим персонажам за 30 секунд — бесплатно</p>
  <a href="https://t.me/whatafaaanfic_bot?utm_source=blog&utm_medium=inline_cta&utm_campaign=fanfic_bot"
     target="_blank"
     style="background:#C2185B;color:#fff;font-weight:700;padding:12px 28px;border-radius:50px;text-decoration:none;display:inline-block">
    Создать фанфик →
  </a>
</div>`

function injectCTA(html) {
  // Вставляем CTA после 3-го закрывающего тега абзаца
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
    image: post.coverUrl,
    datePublished: post.date,
    publisher: { '@type': 'Organization', name: 'WhataFaaanfic', url: 'https://whatafaaanfic.vercel.app' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Popup universe={post.universeTag} />

      <article className="max-w-2xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-6">
          <a href="/" className="hover:text-pink-600">Главная</a> / <a href="/blog" className="hover:text-pink-600">Блог</a> / <span>{post.title}</span>
        </nav>

        {/* Обложка */}
        {post.coverUrl && (
          <img src={post.coverUrl} alt={post.title} className="w-full rounded-2xl mb-8 object-cover max-h-72" />
        )}

        {/* Заголовок */}
        <h1 className="text-3xl font-extrabold text-pink-800 leading-tight mb-3">{post.title}</h1>
        <div className="flex gap-3 text-xs text-gray-400 mb-8">
          <span>{new Date(post.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          {post.category && <span className="bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full capitalize">{post.category}</span>}
        </div>

        {/* Контент */}
        <div
          className="prose prose-pink max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: contentWithCTA }}
        />

        {/* Подарок снизу */}
        <GiftBlock universe={post.universeTag} />
      </article>
    </>
  )
}
