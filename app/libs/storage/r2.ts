import type { Context } from "hono";

import { storageServerConfig } from "~/config/server/storage";

function normalizePrefix(prefix: string) {
  if (!prefix) return "";
  return prefix.endsWith("/") ? prefix : `${prefix}/`;
}

export function getStorageKey(fileName: string) {
  const prefix = normalizePrefix(storageServerConfig.prefix);
  return `${prefix}${fileName}`;
}

/** Public URL for a stored object (served by `GET /api/storage/object`). */
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
