/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {       
        'accent': 'var(--color-accent)',
        principal: {
					100: '#cd550034',
					200: '#cd550051',
					300: '#cd550068',
					400: '#cd550085',
					500: '#cd5500a2',
					600: '#cd5500b9',
					700: '#cd5500c6',
					800: '#cd5500d3',
					900: '#cd5500ff',
					DEFAULT: '#cd5500'
				},
				'principal-dark': '#ff6900'
      },

      fontFamily: { 
        'roboto': ['Roboto', 'sans-serif'],         
      },
    },
  },
  plugins: [],
}

