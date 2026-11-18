
import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { audit } from "@/lib/audit";

export const BODY_FORMAT = "html";

export const SEO_FIELDS = [
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

const READ_ONLY = ["id", "path", "name", "status", "updated_at"];

const UNSAFE = [
  /<\s*script/i,
  /<[^>]*\son[a-z]+\s*=/i,
  /javascript\s*:/i,
];

const MAX_BODY_CHARS = 300000;
const MAX_FIELD_CHARS = 2000;
const MAX_SCHEMA_CHARS = 50000;

export function hasUnsafe(value) {
  if (typeof value === "string") {
    return UNSAFE.some((re) => re.test(value));
  }

  if (Array.isArray(value)) {
    return value.some(hasUnsafe);
  }

  if (value && typeof value === "object") {
    return Object.values(value).some(hasUnsafe);
  }

  return false;
}

// ---------- API key check ----------
const digest = (value) =>
  createHash("sha256").update(String(value)).digest();

function keyIsValid(provided) {
  if (!provided) return false;

  const given = digest(provided);
  let ok = false;

  for (const key of [
    process.env.SEO_BRIDGE_KEY_1,
    process.env.SEO_BRIDGE_KEY_2,
  ]) {
    if (key && timingSafeEqual(given, digest(key))) {
      ok = true;
    }
  }

  return ok;
}

// ---------- Rate limit ----------
const buckets = new Map();

function isRateLimited(bucketId) {
  const limit = Number(process.env.SEO_BRIDGE_RATE_LIMIT_PER_MIN || 60);
  const now = Date.now();

  const hits = (buckets.get(bucketId) || []).filter(
    (time) => now - time < 60000
  );

  const limited = hits.length >= limit;

  if (!limited) {
    hits.push(now);
  }

  buckets.set(bucketId, hits);

  return limited;
}

// ---------- API route wrapper ----------
export function bridge(handler) {
  return async function route(request, context) {
    const routePath = new URL(request.url).pathname;
    const method = request.method;

    const log = async (result, extra) => {
      try {
        await audit({
          route: routePath,
          method,
          result,
          target: null,
          ...extra,
        });
      } catch (err) {
        console.error("audit failed:", err);
      }
    };

    if (
      process.env.NODE_ENV === "production" &&
      request.headers.get("x-forwarded-proto") === "http"
    ) {
      return NextResponse.json(
        { error: "HTTPS is required" },
        { status: 403 }
      );
    }

    const provided = request.headers.get("x-api-key");

    if (!keyIsValid(provided)) {
      await log(401);
      return new NextResponse(null, { status: 401 });
    }

    if (isRateLimited(digest(provided).toString("hex"))) {
      await log(429);

      return NextResponse.json(
        { error: "Too many requests. Wait a minute and try again." },
        {
          status: 429,
          headers: { "Retry-After": "60" },
        }
      );
    }

    let result;

    try {
      const params = context?.params ? await context.params : {};
      result = await handler(request, params);
    } catch (err) {
      console.error("seo-bridge error:", err);
      await log(500);

      return NextResponse.json(
        { error: "Internal error" },
        { status: 500 }
      );
    }

    await log(result.status, {
      target: result.target ?? null,
      ...(result.log || {}),
    });

    return NextResponse.json(result.body, {
      status: result.status,
    });
  };
}

export const fail = (status, error, extra = {}) => ({
  status,
  body: { error, ...extra },
});

export async function readJson(request) {
  try {
    const data = await request.json();

    if (data && typeof data === "object" && !Array.isArray(data)) {
      return { data };
    }
  } catch {
    // Return a consistent JSON error below.
  }

  return { error: "Request body must be a JSON object" };
}

// ---------- Input parsing ----------
export function parseWrite(data, { creating }) {
  const seoInput = {};

  let body;
  let name;
  let version;
  let image;

  for (const [key, value] of Object.entries(data)) {
    if (key === "version" && !creating) {
      version = value;
    } else if (key === "body") {
      body = value;
    } else if (key === "name" && creating) {
      name = value;
    } else if (key === "image" && creating) {
      image = value;
    } else if (key === "seo") {
      if (!value || typeof value !== "object" || Array.isArray(value)) {
        return { error: '"seo" must be an object' };
      }

      Object.assign(seoInput, value);
    } else if (SEO_FIELDS.includes(key)) {
      seoInput[key] = value;
    } else if (
      READ_ONLY.includes(key) &&
      !(creating && key === "name")
    ) {
      return {
        error: `"${key}" is read only and cannot be changed through the API`,
      };
    } else {
      return { error: `Unknown field "${key}"` };
    }
  }

  return {
    seoInput,
    body,
    name,
    version,
    image,
  };
}

// ---------- SEO validation ----------
export function validateSeo(input) {
  const seo = {};

  for (const [field, value] of Object.entries(input)) {
    if (!SEO_FIELDS.includes(field)) {
      return { error: `Field "${field}" is not allowed` };
    }

    if (typeof value !== "string") {
      return { error: `"${field}" must be a string` };
    }

    if (field === "schema_jsonld") {
      if (value.length > MAX_SCHEMA_CHARS) {
        return { error: "schema_jsonld is too large" };
      }

      if (value.trim() !== "") {
        let parsed;

        try {
          parsed = JSON.parse(value);
        } catch {
          return { error: "schema_jsonld is not valid JSON" };
        }

        if (hasUnsafe(parsed)) {
          return {
            error: "schema_jsonld contains script or unsafe markup",
          };
        }
      }
    } else {
      if (value.length > MAX_FIELD_CHARS) {
        return { error: `"${field}" is too long` };
      }

      if (hasUnsafe(value)) {
        return {
          error: `"${field}" contains script or unsafe markup`,
        };
      }

      if (
        (field === "canonical_url" || field === "og_image") &&
        value !== "" &&
        !/^(https:\/\/|\/)/i.test(value)
      ) {
        return {
          error: `"${field}" must be empty, start with https:// or start with /`,
        };
      }
    }

    seo[field] = value;
  }

  return { seo };
}

// ---------- Body validation ----------
export function validateBody(body) {
  if (typeof body !== "string" || body.trim() === "") {
    return "body must be non-empty text";
  }

  if (body.length > MAX_BODY_CHARS) {
    return "body is too large";
  }

  if (hasUnsafe(body)) {
    return "body contains script or unsafe markup";
  }

  return null;
}

// ---------- Name validation ----------
export function validateName(name) {
  if (typeof name !== "string") {
    return "name is required";
  }

  const trimmed = name.trim();

  if (trimmed.length < 3 || trimmed.length > 200) {
    return "name must be 3 to 200 characters";
  }

  if (hasUnsafe(trimmed)) {
    return "name contains script or unsafe markup";
  }

  return null;
}

// ---------- Featured image URL validation ----------
export function validateImageUrl(image) {
  if (typeof image !== "string" || !image.trim()) {
    return "image URL is required";
  }

  if (image.length > 2000) {
    return "image URL is too long";
  }

  try {
    const url = new URL(image);

    if (
      url.protocol !== "https:" ||
      !url.hostname ||
      url.username ||
      url.password
    ) {
      return "image must be a valid public HTTPS URL";
    }
  } catch {
    return "image must be a valid HTTPS URL";
  }

  return null;
}

// ---------- Slug ----------
export function slugify(name) {
  return String(name)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
}

// ---------- Output shapes ----------
export function fullSeo(seo) {
  const out = {};

  for (const field of SEO_FIELDS) {
    out[field] = seo?.[field] ?? "";
  }

  return out;
}

export function postSummary(post) {
  return {
    id: post.id,
    path: post.path,
    name: post.name,
    status: post.status,
    version: post.version,
    seo: fullSeo(post.seo),
    updated_at: post.updated_at,
  };
}

export const postFull = (post) => ({
  ...postSummary(post),
  body: post.body ?? "",
});

export function clampLimit(raw) {
  const n = Number.parseInt(raw ?? "", 10);

  if (!Number.isFinite(n) || n < 1) {
    return 20;
  }

  return Math.min(n, 100);
}
