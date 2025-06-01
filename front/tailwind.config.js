/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'costume-pastel-green' : '#A0C878',
        'costume-cream' : '#FFFDF6',
        'costume-soft-blue' : '#7794B8',
        'costume-warm-coral-pink' : '#E57B73',
      },
      fontFamily: {
        opensans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

