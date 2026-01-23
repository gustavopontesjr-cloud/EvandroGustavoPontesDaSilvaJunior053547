/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Fundo principal (quase preto, igual da foto)
        background: '#09090b', 
        
        // Fundo dos cartões/inputs (um pouco mais claro)
        surface: '#18181b',
        
        // A cor de destaque (o Verde/Ciano Neon da Luri)
        primary: '#00E6B8',
        'primary-hover': '#00c49a',
        
        // Textos
        'text-main': '#f4f4f5', // Branco suave
        'text-muted': '#a1a1aa', // Cinza para textos secundários
      }
    },
  },
  plugins: [],
}