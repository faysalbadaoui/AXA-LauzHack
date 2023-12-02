const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./pages/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./layouts/*.{js,ts,jsx,tsx}",
    "./components/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      "secutry-theme": {
        extend: "dark",
        colors: {
          primary: "#00F260",
          secondary: "#0575E6",
          focus: "#F182F6",
        },
        layout: {
          disabledOpacity: "0.3",
          radius: {
            small: "4px",
            medium: "6px",
            large: "8px",
          },
          borderWidth: {
            small: "1px",
            medium: "2px",
            large: "3px",
          },
        },
      },
    },
    defaultTheme: "secutry-theme",
  })],
};