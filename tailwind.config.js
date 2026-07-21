/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0B192C',
          800: '#1E3A5F',
          700: '#2C4E80',
        },
        gold: {
          500: '#D4AF37',
          600: '#AA820A',
        },
      },
    },
  },
  plugins: [],
}
