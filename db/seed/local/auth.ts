import { createAuth } from "../../../app/libs/auth/server";
import { getD1LocalUrl } from "../../../drizzle.config";
import { getDb } from "./libsql-db";

const env = {
  ...process?.env,
  DB: getD1LocalUrl(),
};

const db = getDb(env);
export const auth = createAuth(env as any);
