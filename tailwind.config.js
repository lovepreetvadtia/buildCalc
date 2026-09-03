/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAFAF8',
        surface: '#FFFFFF',
        'surface-subtle': '#F5F5F2',
        charcoal: {
          50: '#F6F6F6',
          100: '#E7E7E7',
          200: '#D1D1D1',
          300: '#B0B0B0',
          400: '#888888',
          500: '#666666',
          600: '#4D4D4D',
          700: '#333333',
          800: '#222222',
          900: '#171717',
          950: '#0F0F0F',
        },
        primary: {
          50: '#EFF4FF',
          100: '#DBE8FE',
          200: '#BFD7FE',
          300: '#93BFFD',
          400: '#609FFB',
          500: '#3B82F6',
          600: '#155EEF',
          700: '#0F4AC6',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        amber: {
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        border: '#E7E5E4',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
        'highlight': '0 0 0 1px rgba(21, 94, 239, 0.15), 0 2px 4px rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
}
