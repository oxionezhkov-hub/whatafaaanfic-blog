import './globals.css'
import StickyBar from '@/components/StickyBar'

export const metadata = {
  metadataBase: new URL('https://whatafaaanfic.vercel.app'),
  title: { default: 'WhataFaaanfic — ИИ-генератор фанфиков', template: '%s | WhataFaaanfic' },
  description: 'Создай фанфик по любимым героям за 30 секунд. Фильмы, сериалы, игры — нейросеть напишет уникальную историю.',
  openGraph: { siteName: 'WhataFaaanfic', locale: 'ru_RU', type: 'website' },
}

const BOT_URL = 'https://t.me/fanfic_ai_bot'

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(YOUR_METRIKA_ID,"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true});` }} />
      </head>
      <body>
        <StickyBar botUrl={`${BOT_URL}?utm_source=blog&utm_medium=sticky_bar&utm_campaign=fanfic_bot`} />
        <nav style={{ background: '#fff', borderBottom: '1px solid #F4A7B9' }} className="shadow-sm">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span style={{ fontWeight: 900, fontSize: '1.3rem', color: '#8B1A3A', letterSpacing: '-0.5px' }}>
                WhataFaa<span style={{ color: '#C2185B' }}>an</span>fic
              </span>
            </a>
            <div className="flex items-center gap-5 text-sm font-semibold">
              <a href="/blog" style={{ color: '#555' }} className="hover:text-pink-700 transition-colors">Блог</a>
              <a href="/demo" style={{ color: '#555' }} className="hover:text-pink-700 transition-colors">Демо</a>
              <a
                href={`${BOT_URL}?utm_source=blog&utm_medium=header_nav&utm_campaign=fanfic_bot`}
                target="_blank"
                style={{ background: 'linear-gradient(135deg, #E8728A, #C2185B)', color: '#fff', borderRadius: '50px', padding: '8px 20px' }}
                className="hover:opacity-90 transition-opacity shadow-sm"
              >
                ✨ Создать фанфик
              </a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer style={{ background: '#fff', borderTop: '1px solid #F4A7B9', marginTop: '4rem', padding: '2rem 0', textAlign: 'center', color: '#aaa', fontSize: '0.85rem' }}>
          © 2026 WhataFaaanfic ·{' '}
          <a href="/blog" style={{ color: '#C2185B' }}>Блог</a> ·{' '}
          <a href="/demo" style={{ color: '#C2185B' }}>Демо</a>
        </footer>
      </body>
    </html>
  )
}
