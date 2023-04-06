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
      },
    },
  },
  plugins: [require("daisyui")],
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
