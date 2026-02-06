import { Hono } from "hono";
import { and, eq, inArray, ne } from "drizzle-orm";

import type { HonoEnv } from "../../../types";
import {
	getSearchParams,
	getSearchParamsPage,
	getSearchParamsPageSize,
} from "~/utils/server";
import { signInLog } from "~/dals/sign-in/SignInLogDAL";
import { userDAL } from "~/dals/system/user";
import { userPermsDAL } from "~/dals/system/UserPermsDAL";
import { rfj, rsj } from "~/utils/server/response-json";
import { db } from "~/libs/neon";
import { menuRoles, menus, userRoles } from "db/schema";

export const userRouter = new Hono<HonoEnv>();

userRouter.get("/", async (c) => {
	try {
		const req = c.req.raw;
		const page = getSearchParamsPage(req);
		const pageSize = getSearchParamsPageSize(req);
		const name = getSearchParams(req, "name");
		const total = await userDAL.getCount();
		const list = await userDAL.getList({
			page,
			pageSize,
			name: name ?? "",
		});

		return rsj({ total, list });
	} catch (error) {
    console.error("Error in GET /api/admin/system/user", error);
		return rfj(error as Error);
	}
});

userRouter.get("/info", async (c) => {
	try {
		const userId = c.get("userId");
		if (!userId) {
			return rfj({}, "No Authorization No User", { status: 401 });
		}
		let menu = await userPermsDAL.getFlatMenuByUserId(userId);
		const userInfo = await userDAL.getById(userId);
		if (menu.length === 0) {
			const roleRows = await db
				.select({ roleId: userRoles.roleId })
				.from(userRoles)
				.where(eq(userRoles.userId, userId));
			const roleIds = roleRows
				.map((row) => Number(row.roleId))
				.filter((id) => Number.isFinite(id));
			if (roleIds.length) {
				const rows = await db
					.select({
						id: menus.id,
						name: menus.name,
						type: menus.type,
						description: menus.description,
						remark: menus.remark,
						icon: menus.icon,
						path: menus.path,
						path_file: menus.pathFile,
						status: menus.status,
						isShow: menus.isShow,
						isCache: menus.isCache,
						permission: menus.permission,
						isLink: menus.isLink,
						orderNo: menus.orderNo,
						createdAt: menus.createdAt,
						updatedAt: menus.updatedAt,
						parent_menu_id: menus.parentMenuId,
					})
					.from(menus)
					.innerJoin(menuRoles, eq(menuRoles.menuId, menus.id))
					.where(
						and(inArray(menuRoles.roleId, roleIds), ne(menus.type, 3)),
					);
				const unique = new Map<number, any>();
				for (const row of rows) {
					const item = row;
					if (!item) continue;
					if (!unique.has(item.id)) {
						unique.set(item.id, item);
					}
				}
				menu = Array.from(unique.values());
			}
		}
		return rsj({ menu, userInfo });
	} catch (error) {
		return rfj(error as Error);
	}
});

userRouter.get("/:id", async (c) => {
	try {
		const userId = c.req.param("id");
		if (!userId) {
			return rfj({}, "Invalid User Id", { status: 400 });
		}
		const menu = await userPermsDAL.getFlatMenuByUserId(userId);
		const userInfo = await userDAL.getById(userId);
		return rsj({ menu, userInfo });
	} catch (error) {
		return rfj(error as Error);
	}
});

userRouter.post("/", async (c) => {
	try {
		const dto = await c.req.json();
		const result = await userDAL.create(dto);
		return rsj(result);
	} catch (error) {
		return rfj(error as Error);
	}
});

userRouter.put("/:id", async (c) => {
	try {
		const dto = await c.req.json();
		const id = c.req.param("id");
		const result = await userDAL.update({ ...dto, id });
		return rsj(result);
	} catch (error) {
		return rfj(error as Error);
	}
});

userRouter.delete("/", async (c) => {
	try {
		const dto = await c.req.json();
		const ids = (dto.ids ?? []).map((id: any) => String(id));
		const result = await userDAL.deleteByIds(ids);
		return rsj(result ?? {});
	} catch (error) {
		return rfj(error as Error);
	}
});

userRouter.post("/signin", async (c) => {
	try {
		const userId = c.get("userId");
		if (!userId) {
			return rfj({}, "No Authorization No User", { status: 401 });
		}
		const result = await signInLog.create({
			userId,
			signType: 1,
			signTime: new Date(),
		});
		return rsj(result);
	} catch (error) {
		return rfj(error as Error);
	}
});
