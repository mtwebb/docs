module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#ff8700",
      },

      height: {
        "90": "90%",
      },

      boxShadow: {
        xl: "0 0 20px #aaa",
      },

      spacing: {
        "96": "24rem",
      },

      transitionDuration: {
        "0": "0ms",
      },
    },
  },
  variants: {
    margin: ["responsive", "last"],
  },
  experimental: {
    applyComplexClasses: true,
  },
  plugins: [],
};
