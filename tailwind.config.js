/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: { paper: '#f5f5f0', forest:'#102b25', fern:'#c8f5a1', sage:'#e8ede6' },
      fontFamily: { sans: ['DM Sans','sans-serif'], display:['Manrope','sans-serif'] },
    },
  },
  plugins: [],
};
