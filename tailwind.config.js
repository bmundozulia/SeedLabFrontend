/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('./assets/images/fondoRegister.jpg')",
        'fondo-login': "url('./assets/images/fondoLogin.jpg')"

      },
      colors: {
        'custom-gray': 'rgba(188, 188, 188, 0.5)'
      }
    },
  },
  plugins: [],

  "styles": [
    "src/styles.css"
  ],
  "postcss": {
    "procesors": [
      require('tailwindcss'),
      require('autoprefixer')
    ]
  }

}
