/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/preline/dist/.tsx',
  ],
  theme: {
    extend: {
      inset: {
        '-shape-1-bottom': '-80px',
        'shape-1-left': '100px',
      },
      animation: {
        'off-on': 'off-on 10s linear infinite',
      },
      keyframes: {
        'off-on': {
          '0%': { opacity: 0 },
          '90%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [require('flowbite/plugin'),require('preline/plugin'),], 
};
