import fs from "node:fs";
import path from "node:path";
import { cwd } from "node:process";

import type { Context } from "hono";

import { storageDAL } from "~/dals/tools/StorageDAL";
// import { getSystemUserIdFromRequest } from "~/utils/server/auth";
import { extname } from "~/utils/server";
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

const uploadDir = path.join(cwd(), "public", "uploads");
const storageDirectory = "/uploads/";

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
		const fileExtension = path.extname(originalFileName);
		const fileBaseName = path.basename(originalFileName, fileExtension);

		let uniqueFileName = originalFileName;
		let filePath = path.join(uploadDir, uniqueFileName);

		if (fs.existsSync(filePath)) {
			const timestamp = Date.now();
			uniqueFileName = `${fileBaseName}-${timestamp}${fileExtension}`;
			filePath = path.join(uploadDir, uniqueFileName);
		}

		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir, { recursive: true });
		}

		const buffer = Buffer.from(await file.arrayBuffer());
		fs.writeFileSync(filePath, buffer);

		const userId = c.get("userId");
		if (!userId) {
			return rfj({}, "No Authorization No User", { status: 401 });
		}

		const result = await storageDAL.create({
			userId,
			name: file.name,
			fileName: uniqueFileName,
			extName: extname(file.name),
			path: storageDirectory + uniqueFileName,
			size: file.size.toString(),
			type: file.type,
		});

		return rsj(result);
	} catch (error) {
		return rfj(error as Error);
	}
}
