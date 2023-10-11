/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: [
          '"Poppins"',
          ...require("tailwindcss/defaultTheme").fontFamily.sans,
        ],
        outfit: [
          '"Outfit"',
          ...require("tailwindcss/defaultTheme").fontFamily.sans,
        ],
      },
      scale: {
        "-100": "-1",
      },
    },
  },
  plugins: [],
};
