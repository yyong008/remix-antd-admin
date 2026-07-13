import { and, eq, gte, lte } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { userSignLogs } from "../../schema";

function getTodayTime() {
  const today = new Date();
  const startTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0,
    0,
  );
  const endTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    23,
    59,
    59,
  );
  return { startTime, endTime };
}

export async function create(
  db: DrizzleD1Database,
  data: {
    userId: string;
    signType: number;
    signTime?: Date;
    id?: string;
  },
) {
  const rows = await db
    .insert(userSignLogs)
    .values({
      id: data.id ?? crypto.randomUUID(),
      userId: data.userId,
      signType: data.signType,
      signTime: data.signTime ?? new Date(),
    })
    .returning();
  return rows[0];
}

export async function getLatestById(db: DrizzleD1Database, userId: string) {
  const { startTime, endTime } = getTodayTime();
  const rows = await db
    .select()
    .from(userSignLogs)
    .where(
      and(
        eq(userSignLogs.userId, userId),
        gte(userSignLogs.signTime, startTime),
        lte(userSignLogs.signTime, endTime),
      ),
    )
    .limit(1);
  return rows[0] ?? null;
}
