/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#3498db',
        'custom-dark-blue': '#2c3e50',
        'custom-red': '#e74c3c',
        'custom-dark-red': '#992e22',
      },
      screens: {
        'sm': '640px',  // 640px para telas pequenas
        'md': '768px',  // 768px para tablets
        'lg': '1024px', // 1024px para telas maiores
        'xl': '1280px', // 1280px para telas extra grandes
        '2xl': '1536px' // 1536px para telas ainda maiores
      },
    },
  },
  plugins: [],
}
