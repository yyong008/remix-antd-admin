import { drizzle } from "drizzle-orm/d1";
import type { AppLoadContext } from "react-router";

export function getD1Db(context: AppLoadContext) {
  const d1Db = context.cloudflare?.env?.DB;
  if (!d1Db) {
    throw new Error("D1 database binding not found");
  }
  return drizzle(d1Db);
}
