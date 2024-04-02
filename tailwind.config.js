/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
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
  corePlugins: { preflight: false },
  plugins: [],
};
