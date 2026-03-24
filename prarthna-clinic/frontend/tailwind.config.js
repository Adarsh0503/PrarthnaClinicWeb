/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50:  '#e8f1fb',
          100: '#c5d9f5',
          200: '#9dbfed',
          300: '#6fa2e4',
          400: '#4a8adb',
          500: '#2171d1',
          600: '#1565c0',
          700: '#1255a8',
          800: '#0a3d7c',
          900: '#062854',
        },
        gold: {
          400: '#d4a137',
          500: '#c8882a',
          600: '#b07820',
        },
        cream: '#f7faff',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:  ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up':   'fadeUp 0.6s ease forwards',
        'fade-in':   'fadeIn 0.4s ease forwards',
        'slide-in':  'slideIn 0.5s ease forwards',
      },
      keyframes: {
        fadeUp:  { '0%': { opacity: 0, transform: 'translateY(20px)' }, '100%': { opacity: 1, transform: 'translateY(0)' }},
        fadeIn:  { '0%': { opacity: 0 }, '100%': { opacity: 1 }},
        slideIn: { '0%': { opacity: 0, transform: 'translateX(-20px)' }, '100%': { opacity: 1, transform: 'translateX(0)' }},
      },
    },
  },
  plugins: [],
}
