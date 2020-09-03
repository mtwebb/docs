const tailwindcss = require("tailwindcss");

const production = !process.env.ROLLUP_WATCH;

const purgecss = require("@fullhuman/postcss-purgecss")({
  content: [
    "./sandbox/src/**/*.svelte",
    "./src/**/*.svelte",
    "./static/*.html",
  ],
  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
});

module.exports = {
  plugins: [
    tailwindcss("./tailwind.config.js"),
    ...(production ? [purgecss] : []),
  ],
};
