/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#00204a",
          light: "#003472",
        },
        brand: {
          amber: "#fdb44b",
          sky: "#00bbf0",
        },
      },
    },
  },
  plugins: [],
}

