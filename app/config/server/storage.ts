import { storageCommonConfig } from "../common/storage";

const prefix = process.env.STORAGE_PREFIX || storageCommonConfig.prefix;

export const storageServerConfig = {
  ...storageCommonConfig,
  prefix,
};

const allowProductionUpload = process.env.R2_ALLOW_PRODUCTION_UPLOAD?.toLowerCase() === "true";

/**
 * Upload is allowed when the Worker has an R2 `STORAGE` binding (see wrangler.jsonc).
 * In production, also requires `R2_ALLOW_PRODUCTION_UPLOAD=true` unless you want uploads open by default only in non-production.
 */
export function isStorageUploadAllowed(c: { env: { STORAGE?: R2Bucket } }) {
  if (!c.env.STORAGE) return false;
  if (process.env.NODE_ENV !== "production") return true;
  return allowProductionUpload;
}
