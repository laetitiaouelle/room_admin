/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'temp-red': '#be2128',
        'temp-blue': '#435ca8',
        'temp-gray': '#868ea6',
        'temp-gray2': '#afafaf',
        'temp-border-gray': '#d1d3de',
      },
    },
  },
  plugins: [],
}
