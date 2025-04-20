// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // ✅ include all component files
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1",  // Indigo-500
        secondary: "#FBBF24", // Amber-400
        dark: "#1F2937",      // Gray-800
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 12px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
      animation: {
        blink: 'blink 1s infinite',
      },
    },
  },
  plugins: [],
  darkMode: 'class', // or 'media' or false
}
