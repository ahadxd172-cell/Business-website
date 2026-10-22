/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sunvolt: {
          lime: '#bbf451',       // High-energy vibrant lime green from Dribbble
          'lime-hover': '#a6e236',
          'lime-light': '#ebfec6',
          'lime-dark': '#83bd1c',
          navy: '#0c1524',
          'navy-light': '#162238',
          'navy-card': '#131d2e',
          dark: '#080d17',
          gray: '#64748b',
          'light-gray': '#f8fafc',
          border: '#e2e8f0',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'lime-glow': '0 0 25px rgba(187, 244, 81, 0.45)',
        'card-soft': '0 10px 30px -10px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 20px 40px -15px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      }
    },
  },
  plugins: [],
}
