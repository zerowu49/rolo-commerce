/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1f2937",
        secondary: "#6b7280",
        grey: "#BABFCE",
        "grey-white": "#F4F4F4",
        description: "#5F5F5F",
        "green-100": "#375737",
        "green-200": "#748067",
        "black-100": "#1C1C1E",
      },
    },
  },
  plugins: [],
};
