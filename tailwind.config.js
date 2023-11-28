/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./src/App"
  ],
  theme: {
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '19.5px'],
      lg: ['18px', '21.94px'],
      xl: ['20px', '24.38px'],
      '2xl': ['24px', '29.26px'],
      '3xl': ['28px', '50px'],
      '4xl': ['48px', '58px'],
      '8xl': ['96px', '106px']
    },
    extend: {
      spacing: {
        '1': '8px',    
        '2': '12px',   
        '3': '16px',   
        '4': '24px',   
        '5': '32px',   
        '6': '48px',   
        '8': '64px',   
        '10': '80px',  
        '12': '96px',  
      },
      fontFamily: {
        palanquin: ['Palanquin', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'primary': "#ECEEFF",
        "slate-gray": "#6D6D6D",
        "pale-blue": "#F5F6FF",
        "white-400": "rgba(255, 255, 255, 0.80)",
        'silver1': 'rgba(191, 191, 191, 1)',
        'silver2': 'rgba(159, 159, 159, 1)',
        'silver3': 'rgba(127, 127, 127, 1)',
        'silver4': 'rgba(95, 95, 95, 1)',
        'gray1': 'rgba(209, 209, 209, 1)',
        'gray2': 'rgba(143, 143, 143, 1)',
        'gray3': 'rgba(79, 79, 79, 1)',
        'gray4': 'rgba(55, 55, 55, 1)',
        'blue1': 'rgba(173, 216, 230, 1)',
        'blue2': 'rgba(135, 206, 250, 1)',
        'blue3': 'rgba(70, 130, 180, 1)',
        'blue4': 'rgba(0, 0, 128, 1)',
      },
        fontsFamily: {
        'bebas': 'var(--bebas)',
        'garamond': 'var(--garam)',
        'pop-bold' : 'var(--popBold)',
        'pop-light' : 'var(--popLight)',
        'pop-semi' : 'var(--popSemi)',
      },
      boxShadow: {
        '3xl': '0 10px 40px rgba(0, 0, 0, 0.1)'
      },
      screens: {
        "wide": "1440px"
      }
    },
  },
  plugins: [],
}