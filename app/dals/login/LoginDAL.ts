import { and, eq } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { account, user } from "db/schema";

export function createLoginDAL(db: DrizzleD1Database) {
  async function findByUserName(name: string) {
    try {
      const rows = await db
        .select({
          id: user.id,
          name: user.name,
          password: account.password,
          status: user.status,
          email: user.email,
        })
        .from(user)
        .leftJoin(account, and(eq(account.userId, user.id), eq(account.providerId, "credential")))
        .where(eq(user.name, name))
        .limit(1);
      return rows[0] ?? null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function findByEmail(email: string) {
    try {
      const rows = await db
        .select({
          id: user.id,
          name: user.name,
          password: account.password,
          status: user.status,
          email: user.email,
        })
        .from(user)
        .leftJoin(account, and(eq(account.userId, user.id), eq(account.providerId, "credential")))
        .where(eq(user.email, email))
        .limit(1);
      return rows[0] ?? null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  return {
    findByUserName,
    findByEmail,
  };
}

export type LoginDAL = ReturnType<typeof createLoginDAL>;
