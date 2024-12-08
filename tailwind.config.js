/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF3366",
        secondary: "#00C2CB",
        text: "#2A2A3C",
      },
    },
  },
  plugins: [],
};
