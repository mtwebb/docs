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
  const hash = crypto.createHash("md5");
  hash.update(node.properties.name);
  hash.update(body);
  const id = hash.digest("hex");
  // const id = node.properties.name;
  const codeceptFilename = `${id}.js`;

  // Generate Codecept test file.
  let codeceptContents = [
    `Feature("${node.properties.name}")`,
    `Scenario("${id}", (I) => {`,
    body,
    `I.saveScreenshot("${id}.png")`,
    `});`,
  ].join("\n");

  // Write file.
  fs.writeFileSync(path.join(codeceptDir, codeceptFilename), codeceptContents);

  return new Promise((resolve) => {
    // Run Codecept.
    const cmd = spawn("npm run codecept", { shell: true });
    cmd.stdout.on("data", (data) => console.log(data.toString()));
    cmd.stderr.on("data", (data) => console.log(data.toString()));

    cmd.on("exit", () => {
      // Replace <screenshot> tag with an <img> pointing to a screenshot
      // image that we generate from the Codecept test file.
      const imgSrc = path.join(imgDir, id);
      const result = h("img", {
        alt: node.properties.name,
        src: `${imgSrc}.png`,
      });

      resolve(result);
    });
  });
}
