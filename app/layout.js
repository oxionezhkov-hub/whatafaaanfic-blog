
// ============================================================
// app/layout.js
// ============================================================
import './globals.css'
import { Inter } from 'next/font/google'
import StickyBar from '@/components/StickyBar'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata = {
  metadataBase: new URL('https://whatafaaanfic.vercel.app'),
  title: { default: 'WhataFaaanfic — ИИ-генератор фанфиков', template: '%s | WhataFaaanfic' },
  description: 'Создавай уникальные фанфики по любимым аниме, сериалам и фильмам за 30 секунд с помощью нейросети.',
  openGraph: {
    siteName: 'WhataFaaanfic',
    locale: 'ru_RU',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym"); ym(YOUR_METRIKA_ID, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true });`,
          }}
        />
      </head>
      <body className={`${inter.className} bg-pink-50 text-gray-800`}>
        <StickyBar />
        <nav className="bg-white shadow-sm border-b border-pink-100">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="/" className="font-bold text-xl text-pink-800 tracking-tight">
              WhataFaaanfic
            </a>
            <div className="flex gap-6 text-sm font-medium text-gray-600">
              <a href="/blog" className="hover:text-pink-600 transition-colors">Блог</a>
              <a href="/demo" className="hover:text-pink-600 transition-colors">Попробовать</a>
              <a
                href="https://t.me/whatafaaanfic_bot?utm_source=blog&utm_medium=header_nav&utm_campaign=fanfic_bot"
                target="_blank"
                className="bg-pink-600 text-white px-4 py-1.5 rounded-full hover:bg-pink-800 transition-colors"
              >
                Создать фанфик
              </a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="mt-16 py-8 bg-white border-t border-pink-100 text-center text-sm text-gray-400">
          © 2026 WhataFaaanfic · <a href="/blog" className="hover:text-pink-600">Блог</a>
        </footer>
      </body>
    </html>
  )
}
