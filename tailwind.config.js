/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      boxShadow: {
        'custom-md': '0 0 40px 1px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'spin-once': 'spin 0.3s linear',
      },
      fontFamily: {
        'RajdhaniBold': ['RajdhaniBold', 'sans-serif'],
        'RajdhaniLight': ['RajdhaniLight', 'sans-serif'],
        'RajdhaniMedium': ['RajdhaniMedium', 'sans-serif'],
        'RajdhaniRegular': ['RajdhaniRegular', 'sans-serif'],
        'RajdhaniSemiBold': ['RajdhaniSemiBold', 'sans-serif']
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}