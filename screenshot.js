/*
 * Copyright 2020 Nicolo John Davis
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import fs from "fs";
import path from "path";
import crypto from "crypto";
import h from "hastscript";
import u from "unist-builder";
import toString from "hast-util-to-string";
import toHTML from "hast-util-to-html";
import { spawn } from "child_process";
import visit from "unist-util-visit";

const codeceptDir = "codecept";
const imgDir = "/screenshots";

export default () => {
  return async (tree) => {
    let screenshots = [];
    let carousels = [];
    let screenshotsToGenerate = [];

    visit(tree, "element", async (node, i, parent) => {
      if (node.tagName === "screenshot") {
        screenshots.push({
          node,
          i,
          parent,
        });
      }

      if (node.tagName === "carousel") {
        carousels.push({
          node,
          i,
          parent,
        });
      }
    });

    // Create working dir if it doesn't exist.
    if (!fs.existsSync(codeceptDir)) {
      fs.mkdirSync(codeceptDir);
    }

    // Create files for the carousels.
    carousels.filter(NeedsProcessing).forEach(({ node }) => {
      const id = Hash(node);
      const filepath = FileFromID(id);

      screenshotsToGenerate.push(id);

      const contents = GenCodeceptForCarousel(node);
      fs.writeFileSync(filepath, contents.full.join("\n"));
    });

    // Create files for the standalone screenshots.
    screenshots
      .filter(({ parent }) => parent.tagName !== "carousel")
      .filter(NeedsProcessing)
      .forEach(({ node }) => {
        const id = Hash(node);
        const filepath = FileFromID(id);

        screenshotsToGenerate.push(id);

        const contents = GenCodeceptForScreenshot(node);
        fs.writeFileSync(filepath, contents.full.join("\n"));
      });

    // Replace screenshot tags with <img>.
    screenshots.forEach(ReplaceScreenshotTag);

    // Replace carousel tags with raw versions that can be processed by Svelte.
    carousels.forEach(ReplaceCarouselTag);

    // Generate screenshots.
    if (screenshotsToGenerate.length && !process.env.CI) {
      const grep = screenshotsToGenerate.join("|");
      const run = `npm run codecept:headless -- --grep="${grep}"`;

      await new Promise((resolve) => {
        const cmd = spawn(run, { shell: true });
        cmd.stdout.on("data", (data) => console.log(data.toString()));
        cmd.stderr.on("data", (data) => console.log(data.toString()));
        cmd.on("exit", resolve());
      });
    }

    return tree;
  };
};

function Hash(node) {
  const hash = crypto.createHash("sha1");
  hash.update(toHTML(node));
  return hash.digest("hex");
}

function FileFromID(id) {
  const filename = `${id}.js`;
  return path.join(codeceptDir, filename);
}

function NeedsProcessing({ node }) {
  const id = Hash(node);
  const filepath = FileFromID(id);
  return !fs.existsSync(filepath);
}

function IsNotHighlightCommand(line) {
  return (
    line.indexOf("await I.arrow") === -1 &&
    line.indexOf("await I.highlight") === -1
  );
}

function GenCodeceptForCarousel(node) {
  const id = Hash(node);

  let contents = [`Feature("${id}")`];

  let cumulative = [];

  node.children
    .filter((c) => c.tagName === "screenshot")
    .forEach((c) => {
      const { header, middle, footer } = GenCodeceptForScreenshot(c);
      cumulative = [...cumulative.filter(IsNotHighlightCommand), ...middle];
      contents.push(...["", ...header, ...cumulative, ...footer]);
    });

  return {
    full: contents,
  };
}

function GenCodeceptForScreenshot(node) {
  const id = Hash(node);
  const body = toString(node);

  let screenshotCmd = `I.saveScreenshot("${id}.png")`;
  if (node.properties.of) {
    screenshotCmd = `I.saveElementScreenshot("${node.properties.of}", "${id}.png")`;
  }

  const header = [`Scenario("${id}", async ({I}) => {`, 'I.amOnPage("/")'];
  const middle = body.split("\n");
  const footer = [screenshotCmd, "});"];
  const full = [`Feature("${id}")`, "", ...header, ...middle, ...footer];

  return {
    header,
    middle,
    footer,
    full,
  };
}

function ReplaceCarouselTag({ node, i, parent }) {
  const { play } = node.properties;

  let index = 0;
  node.children.forEach((child) => {
    if (child.tagName === "img") {
      if (index === 0) {
        child.properties.className.push("active");
      }
      child.properties["data-index"] = index++;
    }
  });

  parent.children[i] = u(
    "raw",
    `<Carousel play=${play}>` + toHTML(node.children) + "</Carousel>"
  );
}

function ReplaceScreenshotTag({ node, i, parent }) {
  const id = Hash(node);

  // Replace <screenshot> tag with an <img> pointing to a screenshot
  // image that we generate from the Codecept test file.
  const imgSrc = path.join(imgDir, id);
  parent.children[i] = h("img", {
    alt: "screenshot",
    src: `${imgSrc}.png`,
    className: ["screenshot"],
    style: node.properties.width && `width: ${node.properties.width}px`,
  });
}
