import { tree } from "../.routify/routes";

function IsRoutifyInternalFile(entry) {
  if (entry.meta.frontmatter && entry.meta.frontmatter.ignore === false) {
    return false;
  }

  return entry.isReset || entry.isLayout || entry.isIndex || entry.isFallback;
}

function ProcessDir(entry) {
  return {
    text: GetText(entry),
    path: entry.path,
    children: entry.children
      .filter((c) => !IsRoutifyInternalFile(c))
      .sort(Sort)
      .map((child) => (child.isDir ? ProcessDir(child) : ProcessFile(child))),
  };
}

function ProcessFile(entry) {
  return {
    path: entry.path,
    text: GetText(entry),
  };
}

function GetText(entry) {
  const frontmatter = GetFrontmatter(entry);
  if (frontmatter && frontmatter.text) {
    return frontmatter.text;
  }

  const split = entry.path.split("/");
  let t = split[split.length - 1].replace(/\//, "").replace(/[_-]/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function GetFrontmatter(entry) {
  if (entry.isDir) {
    const index = entry.children.filter((c) => c.isIndex)[0];
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
      .filter((entry) => entry.isPage && !IsRoutifyInternalFile(entry))
      .sort(Sort)
      .map(ProcessFile),
  },

  ...tree.children
    .filter((entry) => entry.isDir)
    .sort(Sort)
    .map(ProcessDir),
];
