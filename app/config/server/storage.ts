import { storageCommonConfig } from "../common/storage";

const accessKeyId = process.env.S3_ACCESS_KEY_ID || "";
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY || "";
const region = process.env.S3_REGION || "auto";
const endpoint = process.env.S3_ENDPOINT || "";
const bucket = process.env.S3_BUCKET || "";
const publicBaseUrl = process.env.S3_PUBLIC_URL || "";
const prefix = process.env.S3_PREFIX || storageCommonConfig.prefix;
const forcePathStyle =
	process.env.S3_FORCE_PATH_STYLE?.toLowerCase() === "true";

export const storageServerConfig = {
	...storageCommonConfig,
	enabled: Boolean(accessKeyId && secretAccessKey && bucket && publicBaseUrl),
	bucket,
	region,
	endpoint: endpoint || undefined,
	forcePathStyle,
	credentials: {
		accessKeyId,
		secretAccessKey,
	},
	publicBaseUrl,
	prefix,
};

export function requireStorageConfig() {
	if (!storageServerConfig.credentials.accessKeyId) {
		throw new Error("S3_ACCESS_KEY_ID is not configured");
	}
	if (!storageServerConfig.credentials.secretAccessKey) {
		throw new Error("S3_SECRET_ACCESS_KEY is not configured");
	}
	if (!storageServerConfig.bucket) {
		throw new Error("S3_BUCKET is not configured");
	}
	if (!storageServerConfig.publicBaseUrl) {
		throw new Error("S3_PUBLIC_URL is not configured");
	}
}
