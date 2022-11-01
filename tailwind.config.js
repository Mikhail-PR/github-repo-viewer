module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'autoFit': 'repeat(auto-fit, minmax(150px, 1fr))',
      }
    },
  },
  plugins: [],
}
