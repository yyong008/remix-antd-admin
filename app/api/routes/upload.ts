import type { Context } from "hono";

import { storageDAL } from "~/dals/tools/StorageDAL";
import { extname } from "~/utils/server";
import { getPublicUrl, getStorageKey, uploadObject } from "~/libs/storage/s3";
import {
	rfj,
	rsj,
	respPresentationModeJson,
} from "~/utils/server/response-json";

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
		const key = getStorageKey(uniqueFileName);
		const body = new Uint8Array(await file.arrayBuffer());

		await uploadObject({
			key,
			body,
			contentType: file.type || undefined,
		});
		const path = getPublicUrl(key);

		const userId = c.get("userId");
		if (!userId) {
			return rfj({}, "No Authorization No User", { status: 401 });
		}

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
	} catch (error) {
		return rfj(error as Error);
	}
}
