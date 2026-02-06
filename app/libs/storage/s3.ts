import {
	DeleteObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";

import { requireStorageConfig, storageServerConfig } from "~/config/server/storage";

function normalizePrefix(prefix: string) {
	if (!prefix) return "";
	return prefix.endsWith("/") ? prefix : `${prefix}/`;
}

export function getStorageKey(fileName: string) {
	const prefix = normalizePrefix(storageServerConfig.prefix);
	return `${prefix}${fileName}`;
}

export function getPublicUrl(key: string) {
	const base = storageServerConfig.publicBaseUrl.replace(/\/+$/, "");
	return `${base}/${key.replace(/^\/+/, "")}`;
}

export function resolveStorageKey(input: {
	fileName?: string | null;
	path?: string | null;
}) {
	if (input.fileName) {
		const normalized = input.fileName.replace(/^\/+/, "");
		if (normalized.includes("/")) return normalized;
	}
	if (!input.path) return "";
	try {
		const url = new URL(input.path);
		return url.pathname.replace(/^\/+/, "");
	} catch {
		return String(input.path).replace(/^\/+/, "");
	}
}

function getClient() {
	requireStorageConfig();
	return new S3Client({
		region: storageServerConfig.region,
		endpoint: storageServerConfig.endpoint,
		forcePathStyle: storageServerConfig.forcePathStyle,
		credentials: storageServerConfig.credentials,
	});
}

export async function uploadObject(params: {
	key: string;
	body: Uint8Array | ArrayBuffer;
	contentType?: string;
}) {
	const client = getClient();
	await client.send(
		new PutObjectCommand({
			Bucket: storageServerConfig.bucket,
			Key: params.key,
			Body: params.body,
			ContentType: params.contentType,
		}),
	);
	return getPublicUrl(params.key);
}

export async function deleteObject(key: string) {
	const client = getClient();
	await client.send(
		new DeleteObjectCommand({
			Bucket: storageServerConfig.bucket,
			Key: key,
		}),
	);
}
