import { Hono } from "hono";

import type { HonoEnv } from "../../types";
import { mailTemplateDAL } from "~/dals/tools/MailDAL";
import { sendMail } from "~/mails/resend";
import { storageDAL } from "~/dals/tools/StorageDAL";
import { getSearchParamsPage, getSearchParamsPageSize } from "~/utils/server";
import { rfj, rsj } from "~/utils/server/response-json";

export const toolsRouter = new Hono<HonoEnv>();

toolsRouter.get("/mail", async (c) => {
	try {
		const req = c.req.raw;
		const page = getSearchParamsPage(req);
		const pageSize = getSearchParamsPageSize(req);
		const total = await mailTemplateDAL.getCount();
		const list = await mailTemplateDAL.getList({
			where: {},
			skip: (page - 1) * pageSize,
			take: pageSize,
			orderBy: { id: "desc" } as any,
		});
		return rsj({ total, list });
	} catch (error) {
		return rfj(error as Error);
	}
});

toolsRouter.get("/mail/:id", async (c) => {
	try {
		const id = Number(c.req.param("id"));
		if (!id) {
			return rfj({}, "Invalid Mail Id", { status: 400 });
		}
		const result = await mailTemplateDAL.getById(id);
		return rsj(result ?? {});
	} catch (error) {
		return rfj(error as Error);
	}
});

toolsRouter.post("/mail", async (c) => {
	try {
		const dto = await c.req.json();
		const result = await mailTemplateDAL.create(dto);
		return rsj(result);
	} catch (error) {
		return rfj(error as Error);
	}
});

toolsRouter.post("/mail/send", async (c) => {
	try {
		const dto = await c.req.json();
		const toRaw = dto.to ?? "";
		const to = Array.isArray(toRaw)
			? toRaw
			: String(toRaw)
					.split(",")
					.map((item) => item.trim())
					.filter(Boolean);

		if (!to.length) {
			return rfj({}, "Missing recipient", { status: 400 });
		}

		const subject = dto.subject ?? dto.title ?? "";
		if (!subject) {
			return rfj({}, "Missing subject", { status: 400 });
		}

		const html = dto.html ?? dto.content ?? "";
		const text = dto.text;

		const result = await sendMail({
			to,
			subject,
			html: html || undefined,
			text: text || undefined,
			replyTo: dto.replyTo,
			cc: dto.cc,
			bcc: dto.bcc,
			from: dto.from,
		});

		return rsj(result);
	} catch (error) {
		return rfj(error as Error);
	}
});

toolsRouter.put("/mail", async (c) => {
	try {
		const dto = await c.req.json();
		if (!dto.id) {
			return rfj({}, "Invalid Mail Id", { status: 400 });
		}
		const result = await mailTemplateDAL.update(dto.id, dto);
		return rsj(result);
	} catch (error) {
		return rfj(error as Error);
	}
});

toolsRouter.delete("/mail", async (c) => {
	try {
		const dto = await c.req.json();
		const result = await mailTemplateDAL.deleteByIds(dto.ids ?? []);
		return rsj(result ?? {});
	} catch (error) {
		return rfj(error as Error);
	}
});

toolsRouter.get("/storage", async (c) => {
	try {
		const req = c.req.raw;
		const page = getSearchParamsPage(req);
		const pageSize = getSearchParamsPageSize(req);
		const total = await storageDAL.getCount();
		const list = await storageDAL.getList({
			where: {},
			skip: (page - 1) * pageSize,
			take: pageSize,
			orderBy: { id: "desc" } as any,
		});
		return rsj({ total, list });
	} catch (error) {
		return rfj(error as Error);
	}
});

toolsRouter.get("/storage/:id", async (c) => {
	try {
		const id = Number(c.req.param("id"));
		if (!id) {
			return rfj({}, "Invalid Storage Id", { status: 400 });
		}
		const result = await storageDAL.getById(id);
		return rsj(result ?? {});
	} catch (error) {
		return rfj(error as Error);
	}
});

toolsRouter.post("/storage", async (c) => {
	try {
		const dto = await c.req.json();
		const result = await storageDAL.create(dto);
		return rsj(result);
	} catch (error) {
		return rfj(error as Error);
	}
});

toolsRouter.put("/storage", async (c) => {
	try {
		const dto = await c.req.json();
		if (!dto.id) {
			return rfj({}, "Invalid Storage Id", { status: 400 });
		}
		const result = await storageDAL.update(dto.id, dto);
		return rsj(result);
	} catch (error) {
		return rfj(error as Error);
	}
});

toolsRouter.delete("/storage", async (c) => {
	try {
		const dto = await c.req.json();
		const result = await storageDAL.deleteByIds(dto.ids ?? []);
		return rsj(result ?? {});
	} catch (error) {
		return rfj(error as Error);
	}
});
