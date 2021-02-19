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
  purge: {
    content: ["./src/**/*.svelte", "./static/*.html", "./src/**/*.html"],
    // this is for extracting Svelte `class:` syntax but is not perfect yet, see below
    defaultExtractor: (content) => {
      const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
      const broadMatchesWithoutTrailingSlash = broadMatches.map((match) =>
        _.trimEnd(match, "\\")
      );
      const matches = broadMatches.concat(broadMatchesWithoutTrailingSlash);
      return matches;
    },
    enabled: !process.env.ROLLUP_WATCH,
  },
};
