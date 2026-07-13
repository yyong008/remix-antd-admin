import { and, desc, eq, gte, lte } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { userSignLogs, userSigns } from "../../../schema";

function getYesterdayTime() {
  const now = new Date();
  const y = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  const startTime = new Date(y.getFullYear(), y.getMonth(), y.getDate(), 0, 0, 0);
  const endTime = new Date(y.getFullYear(), y.getMonth(), y.getDate(), 23, 59, 59);
  return { startTime, endTime };
}

export function createSignInDAL(db: DrizzleD1Database) {
  async function getUserSignById(userId: string) {
    const rows = await db
      .select()
      .from(userSigns)
      .where(eq(userSigns.userId, userId))
      .limit(1);
    return rows[0] ?? null;
  }

  async function createUserSign(userId: string) {
    const rows = await db
      .insert(userSigns)
      .values({
        id: crypto.randomUUID(),
        userId,
        resignNums: 0,
        signedNums: 1,
        continuitySignedNums: 1,
      })
      .returning();
    return rows[0];
  }

  async function updateUserSign(
    userId: string,
    data: Partial<{
      resignNums: number;
      signedNums: number;
      continuitySignedNums: number;
    }>,
  ) {
    await db.update(userSigns).set(data).where(eq(userSigns.userId, userId));
    const rows = await db
      .select()
      .from(userSigns)
      .where(eq(userSigns.userId, userId))
      .limit(1);
    return rows[0];
  }

  async function getYesterdaySignLog(userId: string) {
    const { startTime, endTime } = getYesterdayTime();
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

  async function getLatestSignLogById(userId: string) {
    const rows = await db
      .select()
      .from(userSignLogs)
      .where(eq(userSignLogs.userId, userId))
      .orderBy(desc(userSignLogs.signTime))
      .limit(1);
    return rows[0] ?? null;
  }

  return {
    getUserSignById,
    createUserSign,
    updateUserSign,
    getYesterdaySignLog,
    getLatestSignLogById,
  };
}

export type SignInDAL = ReturnType<typeof createSignInDAL>;
