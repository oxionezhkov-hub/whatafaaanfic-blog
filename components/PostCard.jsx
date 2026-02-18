
// ============================================================
// components/PostCard.jsx — КАРТОЧКА СТАТЬИ
// ============================================================
export default function PostCard({ post }) {
  return (
    <a href={`/blog/${post.slug}`} className="group block bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden hover:shadow-md transition-shadow">
      {post.coverUrl && (
        <img src={post.coverUrl} alt={post.title} className="w-full h-44 object-cover" loading="lazy" />
      )}
      <div className="p-5">
        {post.category && (
          <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full font-medium">{post.category}</span>
        )}
        <h3 className="font-bold text-gray-800 mt-2 mb-1 group-hover:text-pink-700 transition-colors leading-snug">{post.title}</h3>
        <p className="text-xs text-gray-400 line-clamp-2">{post.description}</p>
      </div>
    </a>
  )
}
