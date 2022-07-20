/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0070f3',
        secondary: '#e9ecf1',
        hoverGray: '#b1b1b1',
        shadowOverlay: '#0000000C',
        danger: '#ff5959',
        dangerHover: '#ff3c3c',
        success: '#00b300',
        successHover: '#009b00',
        warning: '#ffb300',
        warningHover: '#ff9100',
        textPrimary: '#333333',
        textSecondary: '#A5A8CA'
      }
    }

  },
  plugins: []
}
