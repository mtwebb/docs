exports.config = {
  tests: "codecept/*.js",
  output: "static/screenshots",
  helpers: {
    Playwright: {
      url: "http://localhost:8000",
      show: !process.env.HEADLESS,
      browser: process.env.BROWSER || "chromium",
    },
    Highlighter: {
      require: "./highlighter_helper",
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
