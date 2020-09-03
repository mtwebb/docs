import svelte from "svelte/compiler";
import MagicString from "magic-string";
import fs from "fs";
import path from "path";
import crypto from "crypto";

export default ({
  codeceptDir = "codecept",
  screenshotDir = "/screenshots",
}) => ({
  markup: ({ content, filename }) => {
    const s = new MagicString(content);
    const ast = svelte.parse(content, { filename });

    svelte.walk(ast, {
      enter: function (node) {
        if (node.name === "screenshot") {
          // Put attributes in map.
          let opts = {};
          node.attributes.forEach((attr) => {
            const value = attr.value[0].raw;
            opts[attr.name] = value;
          });

          // Create directory for generated Codecept test files.
          if (!fs.existsSync(codeceptDir)) {
            fs.mkdirSync(codeceptDir);
          }

          // Body of <screenshot> tag.
          const body = node.children[0].raw;

          // Get hash of the body for a stable filename.
          const hash = crypto.createHash("md5");
          hash.update(opts.name);
          hash.update(body);
          const id = hash.digest("hex");
          const basename = path.basename(filename, ".svelte");
          const codeceptFilename = `${basename}-${id}.js`;

          // Generate Codecept test file.
          let codeceptContents = [
            `Feature("${opts.name}")`,
            `Scenario("${id}", (I) => {`,
            body,
            `I.saveScreenshot("${id}.png")`,
            `});`,
          ].join("\n");

          // Write file.
          fs.writeFileSync(
            path.join(codeceptDir, codeceptFilename),
            codeceptContents
          );

          // Replace <screenshot> tag with an <img> pointing to a screenshot
          // image that we generate from the Codecept test file.
          const imgSrc = path.join(screenshotDir, id);
          const fragment = `<img class="${opts.class}" src="${imgSrc}.png" alt=${opts.name} />`;
          s.overwrite(node.start, node.end, fragment);
        }
      },
    });

    return {
      code: s.toString(),
    };
  },
});
