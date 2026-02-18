
// ============================================================
// components/GiftBlock.jsx — ПОДАРОК СНИЗУ СТАТЬИ
// ============================================================
const BOT_URL = 'https://t.me/whatafaaanfic_bot'

export default function GiftBlock({ universe }) {
  return (
    <div className="mt-12 bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 rounded-3xl p-8 text-center">
      <div className="text-4xl mb-3">🎁</div>
      <h3 className="text-xl font-extrabold text-pink-800 mb-2">
        Хочешь фанфик{universe ? ` по «${universe}»` : ' по своей вселенной'}?
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        Напиши любых персонажей и задумку — нейросеть создаст уникальную историю за 30 секунд. Первые фанфики бесплатно.
      </p>
      <a
        href={`${BOT_URL}?utm_source=blog&utm_medium=bottom_gift&utm_campaign=fanfic_bot`}
        target="_blank"
        className="inline-block bg-pink-600 text-white font-bold px-8 py-3 rounded-full hover:bg-pink-800 transition-colors shadow-md"
      >
        ✨ Создать фанфик бесплатно →
      </a>
    </div>
  )
}
