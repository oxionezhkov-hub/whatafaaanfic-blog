
// ============================================================
// app/blog/page.js — СПИСОК СТАТЕЙ
// ============================================================
import { getPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export const metadata = {
  title: 'Блог о фанфиках — советы, идеи, подборки',
  description: 'Статьи о фанфиках по аниме, сериалам и фильмам. Идеи для историй, советы и генератор фанфиков на основе ИИ.',
}

const CATEGORIES = [
  { id: 'all', label: 'Все' },
  { id: 'anime', label: 'Аниме' },
  { id: 'serials', label: 'Сериалы' },
  { id: 'films', label: 'Фильмы' },
  { id: 'ai', label: 'ИИ и нейросети' },
]

export default async function BlogPage({ searchParams }) {
  const category = searchParams?.category || 'all'
  const allPosts = await getPosts()
  const posts = category === 'all' ? allPosts : allPosts.filter(p => p.category === category)

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-pink-800 mb-2">Блог о фанфиках</h1>
      <p className="text-gray-500 mb-8">Идеи, подборки и советы для фанатов аниме, сериалов и фильмов</p>

      {/* Фильтр категорий */}
      <div className="flex gap-2 flex-wrap mb-8">
        {CATEGORIES.map(c => (
          <a
            key={c.id}
            href={`/blog${c.id !== 'all' ? `?category=${c.id}` : ''}`}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              category === c.id
                ? 'bg-pink-600 text-white'
                : 'bg-white border border-pink-200 text-gray-600 hover:border-pink-400'
            }`}
          >
            {c.label}
          </a>
        ))}
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-gray-400 py-20">Статей пока нет. Скоро появятся!</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map(p => <PostCard key={p.slug} post={p} />)}
        </div>
      )}
    </div>
  )
}
