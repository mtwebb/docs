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

import blc from "broken-link-checker";
import { tree } from "../.routify/routes";

const baseURL = "http://localhost:5000";
let paths = ["/"];

function GetPaths(routes) {
  for (const route of routes) {
    if (route.isPage && route.path) {
      paths.push(route.path);
    }

    if (route.children) {
      GetPaths(route.children);
    }
  }
}

const options = {};

const urlChecker = new blc.HtmlUrlChecker(options, {
  link: function (result) {
    if (result.broken) {
      console.error(result);
      process.exit(1);
    }
  },
  end: function () {
    console.log("\nSuccess!");
  },
});

GetPaths(tree.children);
paths.forEach((p) => {
  console.log(p);
  urlChecker.enqueue(baseURL + p);
});
