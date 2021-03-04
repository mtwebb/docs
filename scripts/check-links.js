import blc from "broken-link-checker";
import routes from "../src/routes";

const baseURL = "http://localhost:5000";
let paths = ["/"];

function GetUrls(routes) {
  for (const route of routes) {
    if (route.isPage && route.path) {
      paths.push(route.path);
    }

    if (route.children) {
      GetUrls(route.children);
    }
  }
}

GetUrls(routes);

paths.forEach((path) => console.log(path));

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

paths.forEach((p) => {
  urlChecker.enqueue(baseURL + p);
});
