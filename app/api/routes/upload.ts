import type { Context } from "hono";

import { isStorageUploadAllowed } from "~/config/server/storage";
import { createStorageDAL } from "~/dals/tools/StorageDAL";
import { extname } from "~/utils/server";
import { getPublicObjectUrl, getStorageKey, uploadObject } from "~/libs/storage/r2";
import { rfj, rsj, respPresentationModeJson } from "~/utils/server/response-json";
import { getD1Db } from "~/api/helpers/d1";

const DEMO_TRUE_VALUES = new Set(["1", "true", "yes", "on"]);
const isDemoModeEnabled = () => {
  const raw = process.env.DEMO_MODE;
  if (!raw) {
    return false;
  }
  return DEMO_TRUE_VALUES.has(raw.toLowerCase());
};

export async function uploadHandler(c: Context) {
  try {
    if (isDemoModeEnabled()) {
      return respPresentationModeJson();
    }

    const userId = c.get("userId");
    if (!userId) {
      return rfj({}, "No Authorization No User", { status: 401 });
    }

    if (!isStorageUploadAllowed(c)) {
      if (!c.env.STORAGE) {
        return rfj(
          {},
          "对象存储未配置：请在 wrangler.jsonc 中为 R2 桶设置 binding「STORAGE」（可从 wrangler.jsonc.example 复制并创建桶）。",
        );
      }
      return rfj(
        {},
        "生产环境默认关闭文件上传；确认上线后请在部署环境设置 R2_ALLOW_PRODUCTION_UPLOAD=true",
      );
    }

    const db = getD1Db(c);
    const storageDAL = createStorageDAL(db);

    const formData = await c.req.raw.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof globalThis.File)) {
      return rfj({}, "文件未提供或无效", { status: 400 });
    }

    const originalFileName = file.name;
    const fileExtension = extname(originalFileName);
    const randomId = globalThis.crypto?.randomUUID
      ? globalThis.crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const uniqueFileName = `${randomId}${fileExtension}`;

    const pathPrefix = formData.get("pathPrefix") as string | null;

    let key: string;
    let recordInStorage = false;

    if (pathPrefix) {
      // Custom path prefix (e.g., avatars/ for profile photos)
      key = `${pathPrefix}${uniqueFileName}`;
      // Only record in storages table if not in excluded folders
      recordInStorage = !pathPrefix.startsWith("avatars/");
    } else {
      // Default storage path
      key = getStorageKey(uniqueFileName, userId);
      recordInStorage = true;
    }

    const body = new Uint8Array(await file.arrayBuffer());

    await uploadObject(c, {
      key,
      body,
      contentType: file.type || undefined,
    });
    const path = getPublicObjectUrl(c, key);

    // Only record non-avatar uploads in storages table
    if (recordInStorage) {
      const result = await storageDAL.create({
        userId,
        name: file.name,
        fileName: key,
        extName: extname(file.name),
        path,
        size: file.size.toString(),
        type: file.type,
      });
      return rsj(result);
    }

    // For avatar uploads, just return the path without recording
    return rsj({ path });
  } catch (error) {
    return rfj(error as Error);
  }
}
