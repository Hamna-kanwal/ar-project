// DB ka schema_jsonld text -> <script> mein daalne ke liye safe JSON text.
// Khali ya kharab JSON ho to null (kuch print nahi hoga).
export function toSafeJsonLd(raw) {
  if (!raw || typeof raw !== "string" || !raw.trim()) return null;

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }
  if (data === null || typeof data !== "object") return null;

  // Dobara stringify + escape: text ke andar "</script>" jaisa kuch bhi tag se bahar nahi nikal sakta
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
