import { tree } from "../.routify/routes";

function IsRoutifyInternalFile(entry) {
  return (
    entry.name === "_fallback" ||
    entry.name === "_layout" ||
    (entry.name === "index" && !entry.meta.frontmatter)
  );
}

function ProcessDir(entry) {
  return {
    text: GetText(entry),
    path: entry.name,
    children: entry.children
      .filter((c) => !IsRoutifyInternalFile(c))
      .sort(Sort)
      .map((child) => (child.isDir ? ProcessDir(child) : ProcessFile(child))),
  };
}

function ProcessFile(entry) {
  return {
    path: entry.name,
    text: GetText(entry),
  };
}

function GetText(entry) {
  if (entry.meta.frontmatter) {
    return entry.meta.frontmatter.text;
  }

  let t = entry.name.replace(/[_-]/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function Sort(a, b) {
  const ai = a.meta && a.meta.frontmatter && a.meta.frontmatter.index;
  const bi = b.meta && b.meta.frontmatter && b.meta.frontmatter.index;

  if (ai === undefined && bi === undefined) {
    return 0;
  }

  if (ai === undefined && bi !== undefined) {
    return 1;
  }

  if (ai !== undefined && bi === undefined) {
    return -1;
  }

  return ai < bi ? -1 : 1;
}

export default [
  {
    text: "Getting Started",
    expand: true,
    path: "",
    children: tree.children
      .filter((entry) => entry.isFile && !IsRoutifyInternalFile(entry))
      .sort(Sort)
      .map(ProcessFile),
  },

  ...tree.children.filter((entry) => entry.isDir).map(ProcessDir),
];

/*
export default [
  {
    text: "Getting Started",
    expand: true,
    path: "",
    children: [
      { path: "index", text: "Overview" },
      { path: "concepts", text: "Concepts" },
    ],
  },

  {
    text: "Tutorials",
    path: "tutorials",
    children: [{ path: "basic", text: "Basic" }],
  },

  {
    text: "Guides",
    path: "guides",
    children: [
      {
        text: "Editor",
        children: [
          { path: "layout", text: "Layout" },
          { path: "layers", text: "Layers" },
          { path: "data", text: "Data" },
        ],
      },
      {
        text: "Playtesting",
        children: [
          { path: "interface", text: "Interface" },
          { path: "multiplayer", text: "Multiplayer" },
        ],
      },
      {
        text: "Automation",
        children: [
          { path: "properties", text: "Properties" },
          { path: "behaviors", text: "Behaviors" },
          { path: "traits", text: "Traits" },
          { path: "attributes", text: "Turn Orders" },
        ],
      },
    ],
  },
];
*/
