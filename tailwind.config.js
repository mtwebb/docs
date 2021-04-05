module.exports = {
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
    },

    extend: {
      colors: {
        primary: "#ff8700",
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
    content: [
      "./src/**/*.md",
      "./src/**/*.svelte",
      "./editor/**/*.svelte",
      "./static/*.html",
      "./src/**/*.html",
    ],
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
