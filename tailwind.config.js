/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'ui-sans-serif', 'sans-serif'],
      },
      colors: {
        ink: '#171827',
        paper: '#fbfbfe',
        accent: {
          50: '#f3f1ff',
          100: '#e9e6ff',
          200: '#d8d2ff',
          500: '#6657e8',
          600: '#5546d7',
          700: '#4639b5',
        },
      },
      boxShadow: {
        soft: '0 18px 55px rgba(49, 40, 112, 0.10)',
        card: '0 8px 28px rgba(35, 31, 78, 0.07)',
      },
    },
  },
  plugins: [],
};
