function normalize(value) {
  if (value === undefined || value === null) return "";
  const text = String(value);
  return text === "undefined" || text === "null" ? "" : text;
}

export function versionsMatch(a, b) {
  return normalize(a) === normalize(b);
}

export function isChangeStale(page, change) {
  if (!page) return true;
  return !versionsMatch(page.version, change.base_version);
}

export function nextVersion(current) {
  const n = Number(current);
  return Number.isFinite(n) ? n + 1 : 1;
}