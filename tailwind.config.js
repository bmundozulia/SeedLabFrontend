/** @type {import('tailwindcss').Config} */
module.exports = {
  important:true,
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
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
