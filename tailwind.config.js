module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
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
