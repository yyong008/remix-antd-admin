import { and, eq, gte, lte } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { userSignLogs } from "../../../schema";

function getTodayTime() {
  const today = new Date();
  const startTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
  const endTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
  return { startTime, endTime };
}

export function createSignInLogDAL(db: DrizzleD1Database) {
  async function create(data: {
    userId: string;
    signType: number;
    signTime?: Date;
    id?: string;
  }) {
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

  async function getLatestById(userId: string) {
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

  const createUserSignInLog$ = async (data: any) => {
    const rows = await db
      .insert(userSignLogs)
      .values({
        ...data,
        id: data.id ?? crypto.randomUUID(),
      })
      .returning();
    return rows;
  };

  const getUserTodayIsSignInById$ = (id: string) => {
    const { startTime, endTime } = getTodayTime();
    return db
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
  };

  const createUserSignInLog = create;
  const getUserTodayUserSignLogById = getLatestById;

  return {
    create,
    getLatestById,
    createUserSignInLog,
    getUserTodayUserSignLogById,
    createUserSignInLog$,
    getUserTodayIsSignInById$,
  };
}

export type SignInLogImplDAL = ReturnType<typeof createSignInLogDAL>;
