/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A5C55',
        secondary: '#E2F4F3',
        accent: '#FFB703',
        danger: '#E63946',
        neutral: '#F1FAEE',
        text: '#1D3557',
      },
    },
  },
  plugins: [],
}

