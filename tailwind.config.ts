import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './styles/**/*.css',
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './server/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Override Tailwind amber to match Apricot theme
        amber: {
          50:  '#FFF2EC',
          100: '#FFE6DE',
          200: '#FFD3C9',
          500: '#FF8E6E',
          600: '#F1785A',
          700: '#D86447',
          800: '#B7513A',
        },
        warm: {
          bg: 'var(--bg)',
          card: 'var(--card)',
          text: 'var(--text)',
          muted: 'var(--muted)',
          primary: 'var(--primary)',
          primary600: 'var(--primary-600)'
        },
      },
      fontFamily: {
        sans: ['-apple-system','BlinkMacSystemFont','Segoe UI','Roboto','Helvetica Neue','Arial','PingFang SC','Microsoft YaHei','Noto Sans SC','sans-serif'],
      },
      boxShadow: {
        warm: '0 10px 25px rgba(255, 142, 110, 0.08)',
      },
      borderRadius: {
        xl: '1rem',
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}

export default config


// codex-ok: 2026-04-10T11:10:00+08:00
