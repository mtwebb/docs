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

import u from "unist-builder";
import toString from "hast-util-to-string";
import toHTML from "hast-util-to-html";
import visit from "unist-util-visit";

/**
 * Undoes the effect of rehype-raw.
 */
export default () => {
  return async (tree, { filename }) => {
    visit(tree, "element", async (node, i, parent) => {
      if (node.tagName === "property") {
        Process({ node, i, parent });
      }
    });

    return tree;
  };
};

function Process({ node, i, parent }) {
  const nodeName = node.tagName.charAt(0).toUpperCase() + node.tagName.slice(1);

  let attrs = [];
  for (const key in node.properties) {
    const value = node.properties[key];
    attrs.push(`${key}=${value}`);
  }

  const attrsStr = attrs.join(" ");
  const t = `<${nodeName} ${attrsStr} />`;

  parent.children[i] = u("raw", t);
}
