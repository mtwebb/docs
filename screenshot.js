import fs from "fs";
import path from "path";
import crypto from "crypto";
import h from "hastscript";
import raw from "hast-util-raw";
import toString from "hast-util-to-string";
import codecept from "codeceptjs";

console.log(codecept);

const codeceptDir = "codecept";
const imgDir = "/screenshots";

export default () => {
  return (tree) => {
    // Parse raw nodes.
    tree = raw(tree);

    // Process any <screenshot> tags.
    tree.children.forEach((node, index) => {
      if (node.tagName === "screenshot") {
        tree.children[index] = Process(node);
      }
    });

    return tree;
  };
};

function Process(node) {
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

  // Replace <screenshot> tag with an <img> pointing to a screenshot
  // image that we generate from the Codecept test file.
  const imgSrc = path.join(imgDir, id);
  return h("img", {
    alt: node.properties.name,
    src: `${imgSrc}.png`,
  });
}
