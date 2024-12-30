/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgMain: "#0f3547",
        bgSection: "#062c35",
        textPrimary: "#c2d6e4",
        textSecondary: "#969798",
        hover: "#789091",
        border: "#c2d6e4",
      },
      fontFamily: {
        sans: ["Poppins", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
