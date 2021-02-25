const Helper = require("@codeceptjs/helper");

class LocalStorage extends Helper {
  _before() {
    const { Playwright } = this.helpers;
    return Playwright.executeScript(() => {
      localStorage.clear();
    });
  }
}

module.exports = LocalStorage;
