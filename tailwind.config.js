module.exports = {
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'border-done',
    'border-done-dark',
    'border-pending-dark',
    'shadow-done',
    'shadow-pending',
    'text-done',
    'text-pending',
    'dark:text-done',
    'dark:text-pending',
    'before:border-done',
    'before:border-pending'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}