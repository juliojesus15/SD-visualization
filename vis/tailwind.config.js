/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {      
        tab: {
          blue : '#1f77b4',
          orange : '#ff7f0e',
          green : '#2ca02c',
          red : '#d62728',
          purple : '#9467bd',
          brown : '#8c564b',
          pink : '#e377c2',
          gray : '#7f7f7f',
          olive : '#bcbd22',
          cyan : '#17becf',
          white: '#F5F5F5'
        },
        dropout:{
          light: '#E15759',
          dark: '#F44336'
        },
        pass:{
          light: '#4E79A6',
          dark: '#4CAF50'
        },
        repeat:{
          light: '#F7BF00',
          dark: '#607D8B'
        }, 
        
        dark: {
          100: '#282828',
          200: '#363636'
        },
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

