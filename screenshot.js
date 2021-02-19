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
import raw from "hast-util-raw";
import toString from "hast-util-to-string";
import { spawn } from "child_process";

const codeceptDir = "codecept";
const imgDir = "/screenshots";

export default () => {
  return async (tree) => {
    // Parse raw nodes.
    tree = raw(tree);

    // Process any <screenshot> tags.
    for (let i = 0; i < tree.children.length; i++) {
      const node = tree.children[i];
      if (node.tagName === "screenshot") {
        tree.children[i] = await Process(node);
      }
    }

    return tree;
  };
};

async function Process(node) {
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
    `Scenario("${id}", ({I}) => {`,
    body,
    `I.saveScreenshot("${id}.png")`,
    `});`,
  ].join("\n");

  // Replace <screenshot> tag with an <img> pointing to a screenshot
  // image that we generate from the Codecept test file.
  const imgSrc = path.join(imgDir, id);
  const result = h("img", {
    alt: node.properties.name,
    src: `${imgSrc}.png`,
    class: "screenshot",
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

  // Otherwise, write file ..
  fs.writeFileSync(codeceptFilePath, codeceptContents);

  return new Promise((resolve) => {
    // .. and run Codecept.
    const cmd = spawn(`npm run codecept -- --grep=${id}`, { shell: true });
    cmd.stdout.on("data", (data) => console.log(data.toString()));
    cmd.stderr.on("data", (data) => console.log(data.toString()));
    cmd.on("exit", () => resolve(result));
  });
}
