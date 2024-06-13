/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      doak: {
        whiteff: "#ffff",
        white: '#CCD0CF',
        grey: '#495A67',
        black: '#000000',
      },
    },
    extend: {
      screens: {
        'mobile': '200px',
      },
      fontFamily: {
        custom: ['Termina', 'sans-serif'], 
      },
      fontWeight: {
        normal: 500,
        bold: 700,
        extraBold: 800,
        black: 900
      },
     
    },
   
  },
  plugins: [],
}