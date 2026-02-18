
// ============================================================
// tailwind.config.js
// ============================================================
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pink: {
          50:  '#FFF5F7',
          100: '#FFE4EC',
          200: '#F4A7B9',
          400: '#E8728A',
          600: '#C2185B',
          800: '#8B1A3A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
