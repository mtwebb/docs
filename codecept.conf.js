exports.config = {
  tests: "codecept/*.js",
  output: "static/screenshots",
  helpers: {
    Playwright: {
      url: "https://preview.boardgamelab.app/",
      show: !process.env.HEADLESS,
      browser: process.env.BROWSER || "chromium",
    },
  },
  bootstrap: null,
  mocha: {},
  name: "docs",
  plugins: {
    retryFailedStep: {
      enabled: true,
    },
  },
};
