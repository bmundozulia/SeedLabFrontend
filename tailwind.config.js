/** @type {import('tailwindcss').Config} */
module.exports = {
  important:true,
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function({addUtilities}){
      const newUtilities = {
        ".scrollbar-thin" : {
          scrollbarWidth: "thin",
          scrollbarColore: "rgb(31 29 29) white"
        },
        ".scrollbar-webkit" : {
          "&::-webkit-scrollbar" : {
            width: "8px"
          },
          "&::-webkit-scrollbar-track" : {
            background: "white"
          },
          "&::-webkit-scrollbar-thumb":{
            backgroundColor: "rgb(31 41 55)",
            borderRadius: "20px",
            border: "1px solid white"
          }
        }
      }
      addUtilities(newUtilities, ["responsive", "hover"])
    }
  ],
  
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
