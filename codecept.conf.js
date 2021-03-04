exports.config = {
  tests: "codecept/*.js",
  output: "static/screenshots",
  helpers: {
    Playwright: {
      url: "https://preview.boardgamelab.app/",
      show: !process.env.HEADLESS,
      browser: process.env.BROWSER || "chromium",
    },
    Highlighter: {
      require: "./helpers/highlighter",
    },
  },
  bootstrap: null,
  mocha: {},
  name: "docs",
  plugins: {
    retryFailedStep: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: false,
    },
  },
};
