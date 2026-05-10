import { eq } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { user } from "../../schema";

export function createProfileAccountDAL(db: DrizzleD1Database) {
  async function getById(id: string) {
    const rows = await db.select().from(user).where(eq(user.id, id)).limit(1);
    return rows[0] ?? null;
  }

  return { getById };
}

export type ProfileAccountDAL = ReturnType<typeof createProfileAccountDAL>;