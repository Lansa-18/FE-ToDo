/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        "big-desktop": { max: "87.499em" }, // 1400px
        laptop: { max: "80em" }, // 1280px
        "tab-land": { max: "74.999em" }, // 1200px
        "custom-1050": { max: "65.624em" }, // 1050px
        "tab-port": { max: "61.999em" }, // 992px
        "custom-915": { max: "57.187em" }, // 915px
        "custom-850": { max: "53.124em" }, // 850px
        "land-phone": { max: "47.999em" }, // 768px
        "custom-680": { max: "42.499em" }, // 680px
        phone: { max: "35.999em" }, // 576px
      },
      colors: {
        "bright-blue": "hsl(220, 98%, 61%)",

        // DARK THEME
        "very-dark-blue": "hsl(235, 21%, 11%)",
        "very-dark-desaturated-blue": "hsl(235, 24%, 19%)",
        "light-grayish-blue": "hsl(234, 39%, 85%)",
        "light-grayish-blue-hover": "hsl(236, 33%, 92%)",
        "dark-grayish-blue": "hsl(234, 11%, 52%)",
        "very-dark-grayish-blue": "hsl(233, 14%, 35%)",
        "very-dark-grayish-blue-hover": "hsl(237, 14%, 26%)",

        // LIGHT THEME
        "very-light-gray": "hsl(0, 0%, 98%)",
        "very-light-grayish-blue": "hsl(236, 33%, 92%)",
        "light-grayish-blue-lightmode": "hsl(233, 11%, 84%)",
        "dark-grayish-blue-lightmode": "hsl(236, 9%, 61%)",
        "very-dark-grayish-blue-lightmode": "hsl(235, 19%, 35%)",
      },
      fontFamily: {
        josefin: ["Josefin Sans", "sans-serif"],
      },
      backgroundImage: (theme) => ({
        "desktop-dark": "url(/src/images/bg-desktop-dark.jpg)",
        "desktop-light": "url(/src/images/bg-desktop-light.jpg)",
        "check-background":
          "linear-gradient(to right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
      }),
    },
  },
  plugins: [],
};
