import * as serverUtils from "~/utils/server";
import { and, eq, gte, lte } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { userSignLogs } from "db/schema";

export function createSignInLogDAL(db: DrizzleD1Database) {
  async function create(data: any) {
    const created = await db.insert(userSignLogs).values(data).returning();
    return created[0];
  }

  async function getLatestById(id: string) {
    const { startTime, endTime } = serverUtils.getTodayTime();
    const rows = await db
      .select()
      .from(userSignLogs)
      .where(
        and(
          eq(userSignLogs.userId, id),
          gte(userSignLogs.signTime, startTime),
          lte(userSignLogs.signTime, endTime),
        ),
      )
      .limit(1);
    return rows[0] ?? null;
  }

  return {
    create,
    getLatestById,
  };
}

export type SignInLogDAL = ReturnType<typeof createSignInLogDAL>;
