const Helper = require("@codeceptjs/helper");

class Highlighter extends Helper {
  async highlight(locator, opts = {}) {
    const { Playwright } = this.helpers;
    const { page } = Playwright;

    const body = await page.waitForSelector("body");
    const els = await Playwright._locate(locator);
    const el = els[0];

    const rect = await el.boundingBox();
    const padding = opts.padding || 0;

    await page.evaluate(
      ({ rect, body, padding }) => {
        const div = document.createElement("div");
        div.style.position = "fixed";

        const top = rect.y - padding;
        const left = rect.x - padding;
        const width = rect.width + 2 * padding;
        const height = rect.height + 2 * padding;

        div.style.top = `${top}px`;
        div.style.left = `${left}px`;
        div.style.width = `${width}px`;
        div.style.height = `${height}px`;

        div.style.border = "5px solid red";
        div.style.opacity = "0.5";
        div.style.zIndex = 100;

        body.appendChild(div);

        return true;
      },
      { rect, body, padding }
    );
  }

  async arrowLeft(locator) {
    return this.arrow(locator, { direction: "left" });
  }

  async arrowRight(locator) {
    return this.arrow(locator, { direction: "right" });
  }

  async arrowDown(locator) {
    return this.arrow(locator, { direction: "down" });
  }

  async arrowUp(locator) {
    return this.arrow(locator, { direction: "up" });
  }

  async arrow(locator, opts = {}) {
    const { Playwright } = this.helpers;
    const { page } = Playwright;

    const body = await page.waitForSelector("body");
    const els = await Playwright._locate(locator);
    const el = els[0];

    const rect = await el.boundingBox();
    const padding = opts.padding || 10;
    const direction = opts.direction || "down";

    await page.evaluate(
      ({ rect, body, padding, direction }) => {
        const div = document.createElement("div");
        div.style.position = "fixed";

        let top = rect.y;
        let left = rect.x;
        let width = rect.width;
        let height = rect.height;

        if (direction === "up") {
          top = rect.y + height + padding;
        }

        if (direction === "down") {
          top = rect.y - height - padding;
        }

        if (direction === "right") {
          left = rect.x - width - padding;
        }

        if (direction === "left") {
          left = rect.x + width + padding;
        }

        const arrows = {
          down:
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.171 512.171"><path stroke="red" fill="red" d="M479.046 283.925c-1.664-3.989-5.547-6.592-9.856-6.592H352.305V10.667C352.305 4.779 347.526 0 341.638 0H170.971c-5.888 0-10.667 4.779-10.667 10.667v266.667H42.971a10.702 10.702 0 00-9.856 6.571c-1.643 3.989-.747 8.576 2.304 11.627l212.8 213.504c2.005 2.005 4.715 3.136 7.552 3.136s5.547-1.131 7.552-3.115l213.419-213.504a10.645 10.645 0 002.304-11.628z"/></svg>',

          up:
            '<svg viewBox="0 0 512.17 512.17" xmlns="http://www.w3.org/2000/svg"><path stroke="red" fill="red" d="m33.123 228.25c1.664 3.989 5.547 6.592 9.856 6.592h116.88v266.67c0 5.888 4.779 10.667 10.667 10.667h170.67c5.888 0 10.667-4.779 10.667-10.667v-266.67h117.33a10.702 10.702 0 0 0 9.856-6.571c1.643-3.989 0.747-8.576-2.304-11.627l-212.8-213.5c-2.005-2.005-4.715-3.136-7.552-3.136s-5.547 1.131-7.552 3.115l-213.42 213.5a10.645 10.645 0 0 0-2.304 11.628z"/></svg>',

          left:
            '<svg viewBox="0 0 512.17 512.17" xmlns="http://www.w3.org/2000/svg"><path stroke="red" fill="red" d="m228.25 479.05c3.989-1.664 6.592-5.547 6.592-9.856v-116.88h266.67c5.888 0 10.667-4.779 10.667-10.667v-170.67c0-5.888-4.779-10.667-10.667-10.667h-266.67v-117.33a10.702 10.702 0 0 0-6.571-9.856c-3.989-1.643-8.576-0.747-11.627 2.304l-213.5 212.8c-2.005 2.005-3.136 4.715-3.136 7.552s1.131 5.547 3.115 7.552l213.5 213.42a10.645 10.645 0 0 0 11.628 2.304z"/></svg>',

          right:
            '<svg viewBox="0 0 512.17 512.17" xmlns="http://www.w3.org/2000/svg"><path stroke="red" fill="red" d="m283.92 33.125c-3.989 1.664-6.592 5.547-6.592 9.856v116.88h-266.67c-5.888 0-10.667 4.779-10.667 10.667v170.67c0 5.888 4.779 10.667 10.667 10.667h266.67v117.33a10.702 10.702 0 0 0 6.571 9.856c3.989 1.643 8.576 0.747 11.627-2.304l213.5-212.8c2.005-2.005 3.136-4.715 3.136-7.552s-1.131-5.547-3.115-7.552l-213.5-213.42a10.645 10.645 0 0 0-11.628-2.304z"/></svg>',
        };

        div.innerHTML = arrows[direction];

        div.style.top = `${top}px`;
        div.style.left = `${left}px`;
        div.style.width = `${width}px`;
        div.style.height = `${height}px`;

        div.style.zIndex = 100;

        body.appendChild(div);

        return true;
      },
      { rect, body, padding, direction }
    );
  }
}

module.exports = Highlighter;
