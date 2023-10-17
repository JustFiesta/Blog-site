/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html,js}"],
  theme: {
    extend: {
      fontSize: {
        'esm': '0.3rem'
      },
      fontFamily: {
        'lato': ["'Lato'", ],
      },
      colors: {
      'grad-t': '#263854',
      'grad-b': '#6fb5c2',
      'light-orange': '#FF9F64'
      }
    },
    
  },
  plugins: [],
}
