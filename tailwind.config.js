const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.svelte|js|ts|htm|html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
        serif: ["Zilla Slab", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        dark: "#30363D",
        "base-400": "#3C444C",
        "grade-1": "#F27A54",
        "grade-2": "#A154F2",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: [
      {
        halloween: {
          ...require("daisyui/src/colors/themes")["[data-theme=halloween]"],
          primary: "#F27A54",
          secondary: "#A154F2",
          tertiary: "#6FCF97",
          "base-100": "#F2F4F7",
          "base-200": "#CBCFD4",
          "base-300": "#747D88",
        },
      },
    ],
  },
};
