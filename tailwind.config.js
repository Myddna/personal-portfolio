module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        title: ['"Zen Maru Gothic"'],
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      grayscale: ["hover"],
    },
  },
  plugins: [],
};
