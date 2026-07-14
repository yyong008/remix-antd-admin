import * as mail from "@workspace/database/repositories/tools/mail";
import * as storage from "@workspace/database/repositories/tools/storage";
import { Hono } from "hono";

import type { HonoEnv } from "../../types";
import { requirePermission } from "../../middleware/rbac";
// import { sendMail } from "../../mails/resend";
import { deleteObject, resolveStorageKey } from "@workspace/storage/r2";
import { getSearchParamsPage, getSearchParamsPageSize } from "../../utils/server";
import { rfj, rsj } from "../../utils/server/response-json";
import { getD1Db } from "../../helpers/d1";

export const toolsRouter = new Hono<HonoEnv>();

toolsRouter.get("/mail", requirePermission("tools:mail:read"), async (c) => {
  try {
    const db = getD1Db(c);
    const req = c.req.raw;
    const page = getSearchParamsPage(req);
    const pageSize = getSearchParamsPageSize(req);
    const total = await mail.getCount(db);
    const list = await mail.getList(db, {
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

toolsRouter.get("/mail/:id", requirePermission("tools:mail:read"), async (c) => {
  try {
    const db = getD1Db(c);
    const id = c.req.param("id");
    if (!id) {
      return rfj({}, "Invalid Mail Id", { status: 400 });
    }
    const result = await mail.getById(db, id);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});

toolsRouter.post("/mail", requirePermission("tools:mail:create"), async (c) => {
  try {
    const db = getD1Db(c);
    const dto = await c.req.json();
    const result = await mail.create(db, dto);
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

toolsRouter.post("/mail/send", requirePermission("tools:mail:create"), async (c) => {
  try {
    const dto = await c.req.json();
    const toRaw = dto.to ?? "";
    const to = Array.isArray(toRaw)
      ? toRaw
      : String(toRaw)
          .split(",")
          .map((item: string) => item.trim())
          .filter(Boolean);

    if (!to.length) {
      return rfj({}, "Missing recipient", { status: 400 });
    }

    const subject = dto.subject ?? dto.title ?? "";
    if (!subject) {
      return rfj({}, "Missing subject", { status: 400 });
    }

    const _html = dto.html ?? dto.content ?? "";
    const _text = dto.text;

    // const result = await sendMail({
    //   to,
    //   subject,
    //   html: html || undefined,
    //   text: text || undefined,
    //   replyTo: dto.replyTo,
    //   cc: dto.cc,
    //   bcc: dto.bcc,
    //   from: dto.from,
    // });

    return rsj({});
  } catch (error) {
    return rfj(error as Error);
  }
});

toolsRouter.put("/mail", requirePermission("tools:mail:update"), async (c) => {
  try {
    const db = getD1Db(c);
    const dto = await c.req.json();
    if (!dto.id) {
      return rfj({}, "Invalid Mail Id", { status: 400 });
    }
    const result = await mail.update(db, dto.id, dto);
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

toolsRouter.delete("/mail", requirePermission("tools:mail:delete"), async (c) => {
  try {
    const db = getD1Db(c);
    const dto = await c.req.json();
    const result = await mail.deleteByIds(db, dto.ids ?? []);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});

toolsRouter.get("/storage", requirePermission("tools:storage:read"), async (c) => {
  try {
    const db = getD1Db(c);
    const req = c.req.raw;
    const page = getSearchParamsPage(req);
    const pageSize = getSearchParamsPageSize(req);
    const userId = c.get("userId");
    const where = userId ? { userId } : {};
    const total = await storage.getCount(db, where);
    const list = await storage.getList(db, {
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { id: "desc" } as any,
    });
    return rsj({ total, list });
  } catch (error) {
    return rfj(error as Error);
  }
});

toolsRouter.get("/storage/:id", requirePermission("tools:storage:read"), async (c) => {
  try {
    const db = getD1Db(c);
    const id = c.req.param("id");
    if (!id) {
      return rfj({}, "Invalid Storage Id", { status: 400 });
    }
    const result = await storage.getById(db, id);
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});

toolsRouter.post("/storage", requirePermission("tools:storage:create"), async (c) => {
  try {
    const db = getD1Db(c);
    const dto = await c.req.json();
    const result = await storage.create(db, dto);
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

toolsRouter.put("/storage", requirePermission("tools:storage:update"), async (c) => {
  try {
    const db = getD1Db(c);
    const dto = await c.req.json();
    if (!dto.id) {
      return rfj({}, "Invalid Storage Id", { status: 400 });
    }
    const result = await storage.update(db, dto.id, dto);
    return rsj(result);
  } catch (error) {
    return rfj(error as Error);
  }
});

toolsRouter.delete("/storage", requirePermission("tools:storage:delete"), async (c) => {
  try {
    const db = getD1Db(c);
    const dto = await c.req.json();
    const userId = c.get("userId");
    const items = await storage.getByIds(db, dto.ids ?? []);
    const allowedItems = (items ?? []).filter((item: any) => item.userId === userId);
    const allowedIds = allowedItems.map((item: any) => item.id);
    const deleted = await storage.deleteByIds(db, allowedIds);
    for (const item of deleted ?? []) {
      const key = resolveStorageKey({
        fileName: item.fileName,
        path: item.path,
      });
      if (key) {
        await deleteObject(c, key);
      }
    }
    const result = { count: deleted?.length ?? 0 };
    return rsj(result ?? {});
  } catch (error) {
    return rfj(error as Error);
  }
});
