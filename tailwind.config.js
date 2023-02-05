/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      bunting: {
        50: "#ecf2ff",
        100: "#dce7ff",
        200: "#c1d2ff",
        300: "#9bb3ff",
        400: "#7389ff",
        500: "#5360ff",
        600: "#3434f7",
        700: "#2a27db",
        800: "#2323b0",
        900: "#10113d",
      },
      malibu: {
        50: "#ebfeff",
        100: "#cdf9ff",
        200: "#a1f1ff",
        300: "#52e2ff",
        400: "#1acef6",
        500: "#00b1dc",
        600: "#018cb9",
        700: "#097095",
        800: "#115b79",
        900: "#134b66",
      },
    },
    extend: {
      fontFamily: {
        Ubuntu: ['"Ubuntu"', "cursive"],
      },
    },
  },
  plugins: [],
};
