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

    for (const screenshot of screenshots) {
      const { node, i, parent } = screenshot;
      parent.children[i] = await ProcessScreenshot(node);
    }

    for (const carousel of carousels) {
      const { node, i, parent } = carousel;
      parent.children[i] = ProcessCarousel(node);
    }

    return tree;
  };
};

function ProcessCarousel(node) {
  const play = node.properties.play;

  let index = 0;
  node.children.forEach((child) => {
    if (child.tagName === "img") {
      if (index === 0) {
        child.properties.className.push("active");
      }
      child.properties["data-index"] = index++;
    }
  });

  return u(
    "raw",
    `<Carousel play=${play}>` + toHTML(node.children) + "</Carousel>"
  );
}

async function ProcessScreenshot(node) {
  // Body of <screenshot> tag containing Codecept code.
  const body = toString(node);

  if (!fs.existsSync(codeceptDir)) {
    fs.mkdirSync(codeceptDir);
  }

  // Get hash of the body for a stable filename.
  let id = node.properties.name;

  if (!id) {
    const hash = crypto.createHash("md5");
    hash.update(body);
    id = hash.digest("hex");
  }

  const codeceptFilename = `${id}.js`;

  // Generate Codecept test file.
  const codeceptContents = [
    `Feature("${id}")`,
    `Scenario("${id}", async ({I}) => {`,
    `I.amOnPage('/')`,
    body,
    `I.saveScreenshot("${id}.png")`,
    `});`,
  ].join("\n");

  // Replace <screenshot> tag with an <img> pointing to a screenshot
  // image that we generate from the Codecept test file.
  const imgSrc = path.join(imgDir, id);
  const result = h("img", {
    alt: "screenshot",
    src: `${imgSrc}.png`,
    className: ["screenshot"],
  });

  // If the file exists with identical content, then assume that the
  // image was already generated and return the image tag right away.
  const codeceptFilePath = path.join(codeceptDir, codeceptFilename);
  try {
    const existing = fs.readFileSync(codeceptFilePath, { encoding: "utf8" });
    if (codeceptContents === existing) {
      return result;
    }
  } catch (_) {}

  // Otherwise, write file.
  fs.writeFileSync(codeceptFilePath, codeceptContents);

  // If we're running on Netlify or elsewhere, assume that the screenshots
  // are generated already.
  if (process.env.CI) {
    return result;
  }

  // Run Codecept.
  return new Promise((resolve) => {
    const cmd = spawn(`npm run codecept:headless -- --grep=${id}`, {
      shell: true,
    });
    cmd.stdout.on("data", (data) => console.log(data.toString()));
    cmd.stderr.on("data", (data) => console.log(data.toString()));
    cmd.on("exit", () => resolve(result));
  });
}
