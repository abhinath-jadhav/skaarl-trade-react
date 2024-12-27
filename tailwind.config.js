/** @type {import('tailwindcss').Config} */
import { plugin } from "postcss";
import tailwindScrollbarHide from "tailwind-scrollbar-hide";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".no-spinner": {
          appearance: "none",
          "-moz-appearance": "textfield",
          "-webkit-appearance": "none",
        },
      });
    },
  ],
  darkMode: "class",
};
