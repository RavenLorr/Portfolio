// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        'space-game': ['Space Game', 'sans-serif'],
      },
      backgroundImage: {
        'custom-radial': 'radial-gradient(circle, #184F52, #123C3E, #030B0A)',
      },
      colors: {
        'custom-radial-opacity': 'rgba(24, 79, 82, 0.8)', // Adjust the opacity as needed
      },
    },
  },
  plugins: [],
};