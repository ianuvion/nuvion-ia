/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // 👈 esta línea es la que faltaba
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: { 
    extend: {}, 
  },
  plugins: [],
};
