import type { Context } from "hono";

/**
 * Public read of objects from the bound R2 bucket (local dev + same-origin URLs in DB).
 * No S3 public URL or custom domain required.
 */
export async function storageObjectHandler(c: Context) {
  const key = c.req.query("key");
  if (!key) {
    return c.json({ message: "missing key" }, 400);
  }

  const bucket = c.env.STORAGE;
  if (!bucket) {
    return c.json({ message: "对象存储未配置（缺少 STORAGE 绑定）" }, 503);
  }

  const obj = await bucket.get(key);
  if (!obj) {
    return c.json({ message: "not found" }, 404);
  }

  const headers = new Headers();
  obj.writeHttpMetadata(headers);
  if (!headers.has("content-type")) {
    headers.set("content-type", "application/octet-stream");
  }
  headers.set("cache-control", "public, max-age=3600");

  return new Response(obj.body, { headers });
}
