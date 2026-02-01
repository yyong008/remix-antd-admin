import { Hono } from "hono";

import type { HonoEnv } from "../../types";
import { profileAccountDAL } from "~/dals/profile/ProfileAccountDAL";
import { profileLinkCategoryDAL } from "~/dals/profile/ProfileLinkCategoryDAL";
import { profileLinkDAL } from "~/dals/profile/ProfileLinkDAL";
import {
	getSearchParams,
	getSearchParamsPage,
	getSearchParamsPageSize,
} from "~/utils/server";
import { rfj, rsj } from "~/utils/server/response-json";

export const profileRouter = new Hono<HonoEnv>();

profileRouter.get("/profile/account", async (c) => {
	try {
		const userId = c.get("userId");
		if (!userId) {
			return rfj({}, "No Authorization No User", { status: 401 });
		}
		const result = await profileAccountDAL.getById(userId);
		return rsj(result ?? {});
	} catch (error) {
		return rfj(error as Error);
	}
});

profileRouter.post("/profile/account", async () => {
	return rfj({}, "Unsupport", { status: 501 });
});

profileRouter.put("/profile/account", async () => {
	return rfj({}, "Unsupport", { status: 501 });
});

profileRouter.delete("/profile/account", async () => {
	return rfj({}, "Unsupport", { status: 501 });
});

profileRouter.get("/profile/link/category", async (c) => {
	try {
		const userId = c.get("userId");
		if (!userId) {
			return rfj({}, "No Authorization No User", { status: 401 });
		}
		const req = c.req.raw;
		const page = getSearchParamsPage(req);
		const pageSize = getSearchParamsPageSize(req);
		const total = await profileLinkCategoryDAL.getCountByUserId(userId);
		const list = await profileLinkCategoryDAL.getListByUserId({
			where: { userId },
			skip: (page - 1) * pageSize,
			take: pageSize,
			orderBy: { id: "desc" } as any,
		});
		return rsj({ total, list });
	} catch (error) {
		return rfj(error as Error);
	}
});

profileRouter.post("/profile/link/category", async (c) => {
	try {
		const userId = c.get("userId");
		if (!userId) {
			return rfj({}, "No Authorization No User", { status: 401 });
		}
		const dto = await c.req.json();
		const result = await profileLinkCategoryDAL.create({ ...dto, userId });
		return rsj(result);
	} catch (error) {
		return rfj(error as Error);
	}
});

profileRouter.put("/profile/link/category", async (c) => {
	try {
		const dto = await c.req.json();
		const result = await profileLinkCategoryDAL.update(dto);
		return rsj(result);
	} catch (error) {
		return rfj(error as Error);
	}
});

profileRouter.delete("/profile/link/category", async (c) => {
	try {
		const dto = await c.req.json();
		const result = await profileLinkCategoryDAL.deleteByIds(dto.ids ?? []);
		return rsj(result ?? {});
	} catch (error) {
		return rfj(error as Error);
	}
});

profileRouter.get("/profile/link", async (c) => {
	try {
		const userId = c.get("userId");
		if (!userId) {
			return rfj({}, "No Authorization No User", { status: 401 });
		}
		const req = c.req.raw;
		const page = getSearchParamsPage(req);
		const pageSize = getSearchParamsPageSize(req);
		const categoryId = Number(getSearchParams(req, "category") ?? 0);
		const total = await profileLinkDAL.getCount({ userId });
		const list = await profileLinkDAL.getList({
			where: {
				userId,
				...(categoryId ? { categoryId } : {}),
			},
			skip: (page - 1) * pageSize,
			take: pageSize,
		});
		return rsj({ total, list });
	} catch (error) {
		return rfj(error as Error);
	}
});

profileRouter.post("/profile/link", async (c) => {
	try {
		const userId = c.get("userId");
		if (!userId) {
			return rfj({}, "No Authorization No User", { status: 401 });
		}
		const dto = await c.req.json();
		const result = await profileLinkDAL.create({ ...dto, userId });
		return rsj(result);
	} catch (error) {
		return rfj(error as Error);
	}
});

profileRouter.put("/profile/link", async (c) => {
	try {
		const dto = await c.req.json();
		if (!dto.id) {
			return rfj({}, "Invalid Link Id", { status: 400 });
		}
		const result = await profileLinkDAL.update({ id: dto.id, data: dto });
		return rsj(result);
	} catch (error) {
		return rfj(error as Error);
	}
});

profileRouter.delete("/profile/link", async (c) => {
	try {
		const dto = await c.req.json();
		const result = await profileLinkDAL.deleteByIds(dto.ids ?? []);
		return rsj(result ?? {});
	} catch (error) {
		return rfj(error as Error);
	}
});
