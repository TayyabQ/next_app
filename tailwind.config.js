// @type {import('tailwindcss').Config} 
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /border-(gray|blue|red|green|yellow|purple|pink)-500/,
    },
    {
      pattern: /focus:border-(gray|blue|red|green|yellow|purple|pink)-600/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
