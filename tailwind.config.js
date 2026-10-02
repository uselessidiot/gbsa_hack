/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9ebff',
          200: '#bcddfe',
          300: '#8ec7fd',
          400: '#59a6fb',
          500: '#2563eb', // GBSA Primary Blue
          600: '#1d4ed8',
          700: '#1e40af',
          800: '#1e378a',
          900: '#0f172a',
          accent: '#06b6d4', // Cyan
          purple: '#8b5cf6', // Violet
          emerald: '#10b981', // Growth Emerald
        },
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(37, 99, 235, 0.3)',
        'glow-purple': '0 0 25px -5px rgba(139, 92, 246, 0.3)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
      },
    },
  },
  plugins: [],
}
