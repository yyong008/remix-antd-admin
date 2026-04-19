import type { Context } from "hono";
import { drizzle } from "drizzle-orm/d1";
import type { DrizzleD1Database } from "drizzle-orm/d1";

export function getDb(c: Context): DrizzleD1Database {
  const db = c.env.DB;
  if (!db) {
    throw new Error("D1 database not found in env");
  }
  return drizzle(db);
}

export function createDb(context: { env: { DB: D1Database } }): DrizzleD1Database {
  const db = context.env.DB;
  if (!db) {
    throw new Error("D1 database not found in env");
  }
  return drizzle(db);
}

export type DbType = ReturnType<typeof getDb>;
