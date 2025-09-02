/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        didot: ['"Playfair Display"', 'serif'],
      },
    },
  },
};
