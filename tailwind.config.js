module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark","light","cupcake","coffee","night"]
  },
 
}