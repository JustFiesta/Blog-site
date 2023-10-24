/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html,js,php}"],
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
      'light-orange': '#FF9F64',
      'light-teal': '#84fbe9',
      },
      boxShadow: {
        'menu-box-teal': '3px 3px #84fbe9',
        'menu-box-orange': '3px 3px #FF9F64',
      }
    },
    
  },
  plugins: [],
}
