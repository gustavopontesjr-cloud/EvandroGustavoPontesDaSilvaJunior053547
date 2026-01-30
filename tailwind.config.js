/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090b',
        surface: '#18181b',
        primary: '#00E6B8',
        'primary-hover': '#00c49a',
        'text-main': '#f4f4f5',
        'text-muted': '#a1a1aa',
      }
    },
  },
  plugins: [],
}