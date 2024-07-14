/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // DARK THEME
        'very-dark-blue': 'hsl(235, 21%, 11%)',
        'very-dark-desaturated-blue': 'hsl(235, 24%, 19%)',
        'light-grayish-blue': 'hsl(234, 39%, 85%)',
        'light-grayish-blue-hover': 'hsl(236, 33%, 92%)',
        'dark-grayish-blue': 'hsl(234, 11%, 52%)',
        'very-dark-grayish-blue': 'hsl(233, 14%, 35%)',
        'very-dark-grayish-blue-hover': 'hsl(237, 14%, 26%)',

        // LIGHT THEME
        'very-light-gray': 'hsl(0, 0%, 98%)',
        'very-light-grayish-blue': 'hsl(236, 33%, 92%)',
        'light-grayish-blue-lightmode': 'hsl(233, 11%, 84%)',
        'dark-greyish-blue-lightmode': 'hsl(236, 9%, 61%)',
        'very-dark-greyish-blue-lightmode': 'hsl(235, 19%, 35%)',
      },
      fontFamily: {
        'josefin': ['Josefin Sans', 'sans-serif'],
      },
      backgroundImage: theme => ({
        'desktop-dark': "url(/src/images/bg-desktop-dark.jpg)",
      }),
    },
  },
  plugins: [],
}