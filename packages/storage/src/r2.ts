import type { Context } from "hono";

const storageCommonConfig = {
  provider: "r2",
  prefix: "uploads/",
};

function normalizePrefix(p: string) {
  if (!p) return "";
  return p.endsWith("/") ? p : `${p}/`;
}

export function getStorageKey(fileName: string, userId?: string | number) {
  const prefix = normalizePrefix(storageCommonConfig.prefix);
  if (userId !== undefined) {
    return `${prefix}user-${userId}/${fileName}`;
  }
  return `${prefix}${fileName}`;
}

export function getPublicObjectUrl(c: Context, key: string) {
  const origin = new URL(c.req.url).origin;
  return `${origin}/api/storage/object?key=${encodeURIComponent(key)}`;
}

export function resolveStorageKey(input: { fileName?: string | null; path?: string | null }) {
  if (input.fileName) {
    const normalized = input.fileName.replace(/^\/+/, "");
    if (normalized.includes("/")) return normalized;
  }
  if (!input.path) return "";
  try {
    const url = new URL(input.path);
    const key = url.searchParams.get("key");
    if (key) return key;
    return url.pathname.replace(/^\/+/, "");
  } catch {
    return String(input.path).replace(/^\/+/, "");
  }
}

export async function uploadObject(
  c: Context,
  params: {
    key: string;
    body: Uint8Array | ArrayBuffer;
    contentType?: string;
  },
) {
  const bucket = c.env.STORAGE;
  if (!bucket) {
    throw new Error("R2 binding STORAGE is not configured");
  }
  await bucket.put(params.key, params.body, {
    httpMetadata: params.contentType ? { contentType: params.contentType } : undefined,
  });
  return getPublicObjectUrl(c, params.key);
}

export async function deleteObject(c: Context, key: string) {
  const bucket = c.env.STORAGE;
  if (!bucket || !key) return;
  await bucket.delete(key);
}

export function isStorageUploadAllowed(c: { env: { STORAGE?: R2Bucket } }) {
  if (!c.env.STORAGE) return false;
  if (process.env.NODE_ENV !== "production") return true;
  const allowProductionUpload = process.env.R2_ALLOW_PRODUCTION_UPLOAD?.toLowerCase() === "true";
  return allowProductionUpload;
}