/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vn-red': '#DA251D',
        'vn-red-deep': '#8F1713',
        'vn-red-dark': '#5c0f0c',
        'vn-gold': '#FFCD00',
        'vn-gold-antique': '#D4A72C',
        'vn-bronze': '#A47537',
        'vn-ivory': '#F5EFE6',
        'vn-parchment': '#E8DFCE',
        'vn-charcoal': '#121214',
        'vn-black': '#090A0C',
        'vn-jade': '#1F4E3F',
        'vn-indigo': '#1B2A4A'
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Be Vietnam Pro"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        cinematic: '0.35em',
        wide2: '0.18em',
      },
      animation: {
        'spin-slow': 'spin 35s linear infinite',
        'spin-reverse': 'spin-reverse 45s linear infinite',
        'pulse-subtle': 'pulse-subtle 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'spin-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
