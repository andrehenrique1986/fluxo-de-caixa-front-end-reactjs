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
    },
  },
  plugins: [],
}
