/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fff9e0',
          100: '#fff3bf',
          200: '#ffe680',
          300: '#ffd940',
          400: '#ffcc00',
          500: '#e6b800',
          600: '#bf9900',
          700: '#997a00',
          800: '#735c00',
          900: '#4d3d00',
          950: '#2a2200',
        },
      },
    },
  },
  plugins: [],
};
