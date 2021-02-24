import { tree } from "../.routify/routes";

function IsRoutifyInternalFile(entry) {
  if (entry.meta.frontmatter && entry.meta.frontmatter.ignore === false) {
    return false;
  }

  return (
    entry.name === "_fallback" ||
    entry.name === "_layout" ||
    entry.name === "index"
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
  const frontmatter = GetFrontmatter(entry);
  if (frontmatter && frontmatter.text) {
    return frontmatter.text;
  }

  let t = entry.name.replace(/[_-]/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function GetFrontmatter(entry) {
  if (entry.isDir) {
    const index = entry.children.filter((c) => c.name === "index")[0];
    return index && index.meta && index.meta.frontmatter;
  }

  return entry && entry.meta && entry.meta.frontmatter;
}

function Sort(a, b) {
  const af = GetFrontmatter(a);
  const bf = GetFrontmatter(b);

  const ai = af && af.index;
  const bi = bf && bf.index;

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

  ...tree.children
    .filter((entry) => entry.isDir)
    .sort(Sort)
    .map(ProcessDir),
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
