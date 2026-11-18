import { versionsMatch } from "@/lib/version";

const SEO_FIELDS = [
  "meta_title",
  "meta_description",
  "canonical_url",
  "robots",
  "og_title",
  "og_description",
  "og_image",
  "image_alt_text",
  "schema_jsonld",
];

const ALLOWED_TOP = ["version", "seo", "body"];

// script tag, event attribute inside a tag (onclick= etc), javascript: link
const UNSAFE = [/<\s*script/i, /<[^>]*\son[a-z]+\s*=/i, /javascript\s*:/i];
const BAD_KEYS = ["__proto__", "constructor", "prototype"];

const fail = (status, error) => ({ status, error });
const isPlain = (v) => v !== null && typeof v === "object" && !Array.isArray(v);

// Walks strings, arrays and objects. Returns an error text or null.
function checkBodyValue(value, path = "body") {
  if (typeof value === "string") {
    return UNSAFE.some((re) => re.test(value)) ? `${path} contains script or unsafe markup` : null;
  }
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const err = checkBodyValue(value[i], `${path}[${i}]`);
      if (err) return err;
    }
    return null;
  }
  if (isPlain(value)) {
    for (const [k, v] of Object.entries(value)) {
      if (BAD_KEYS.includes(k)) return `${path}.${k} is not an allowed key`;
      const err = checkBodyValue(v, `${path}.${k}`);
      if (err) return err;
    }
    return null;
  }
  if (typeof value === "number" || typeof value === "boolean" || value === null) return null;
  return `${path} has an unsupported value`;
}

// Objects are merged key by key, arrays and strings are replaced
function mergeBody(base, patch) {
  if (!isPlain(base) || !isPlain(patch)) return patch;
  const out = { ...base };
  for (const [k, v] of Object.entries(patch)) out[k] = mergeBody(base[k], v);
  return out;
}

export function validatePut(input, page) {
  if (!isPlain(input)) return fail(400, "Body must be a JSON object");

  for (const key of Object.keys(input)) {
    if (key === "path" || key === "name") {
      return fail(400, `"${key}" is read only and cannot be changed`);
    }
    if (!ALLOWED_TOP.includes(key)) return fail(400, `Field "${key}" is not allowed`);
  }

  if (typeof input.version !== "string" || !input.version) {
    return fail(400, "version is required: send the version you read");
  }

  const hasSeo = "seo" in input;
  const hasBody = "body" in input;
  if (!hasSeo && !hasBody) return fail(400, "Send a seo object or a body to change");

  // ---- seo checks ----
  if (hasSeo) {
    const seo = input.seo;
    if (!isPlain(seo) || Object.keys(seo).length === 0) {
      return fail(400, "seo must be an object with at least one field");
    }
    for (const [key, value] of Object.entries(seo)) {
      if (!SEO_FIELDS.includes(key)) return fail(400, `seo.${key} is not an allowed field`);
      if (typeof value !== "string") return fail(400, `seo.${key} must be a string`);
      if (UNSAFE.some((re) => re.test(value))) {
        return fail(400, `seo.${key} contains script or unsafe markup`);
      }
    }
    if (seo.schema_jsonld) {
      try {
        JSON.parse(seo.schema_jsonld);
      } catch {
        return fail(400, "seo.schema_jsonld is not valid JSON");
      }
    }
  }

  // ---- body checks ----
  if (hasBody) {
    const body = input.body;
    if (!(typeof body === "string" || isPlain(body))) {
      return fail(400, "body must be an object or a string");
    }
    if (isPlain(page.body) !== isPlain(body)) {
      return fail(400, `body type must match the live page (live body is ${isPlain(page.body) ? "an object" : "a string"})`);
    }
    if (isPlain(body) && Object.keys(body).length === 0) {
      return fail(400, "body object is empty");
    }
    const err = checkBodyValue(body);
    if (err) return fail(400, err);
  }

  // Version check last: the request shape must be valid first
  if (!versionsMatch(input.version, page.version)) {
    return fail(409, `Page changed since you read it (current version is ${page.version}). Read it again and resend.`);
  }

  const result = { seo: null, body: null };

  if (hasSeo) {
    const old_value = {};
    const new_value = {};
    for (const [key, value] of Object.entries(input.seo)) {
      const current = page.seo?.[key] ?? "";
      if (value !== current) {
        old_value[`seo.${key}`] = current;
        new_value[`seo.${key}`] = value;
      }
    }
    if (Object.keys(new_value).length > 0) result.seo = { old_value, new_value };
  }

  if (hasBody) {
    const proposed_body = mergeBody(page.body, input.body);
    if (JSON.stringify(proposed_body) !== JSON.stringify(page.body)) {
      result.body = { old_body: page.body ?? null, proposed_body };
    }
  }

  if (!result.seo && !result.body) {
    return fail(400, "No changes: all values are the same as the live page");
  }

  return result;
}