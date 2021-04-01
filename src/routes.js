export function GetText(entry) {
  const frontmatter = GetFrontmatter(entry);
  if (frontmatter && frontmatter.text) {
    return frontmatter.text;
  }

  return entry.title.charAt(0).toUpperCase() + entry.title.slice(1);
}

export function GetFrontmatter(entry) {
  const f = entry && entry.meta && entry.meta.frontmatter;
  if (f) return f;

  return entry && entry.index && entry.index.meta.frontmatter;
}

export function Sort(a, b) {
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
