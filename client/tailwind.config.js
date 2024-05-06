/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#378CE7",
        grey: {
          DEFAULT: "#979DA4",
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          "2xl": "2rem",
        },
        screens: {
          "2xl": "1400px",
        },
      },
    },
  },
  corePlugins: { preflight: true },
  plugins: [],
};
