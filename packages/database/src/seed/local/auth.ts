import { getD1LocalUrl } from "../../../drizzle.config.local";
import { getDb } from "./libsql-db";

const env: any = {
  ...process?.env,
  DB: getD1LocalUrl(),
};

export const getLocalDb = () => {
  return getDb(env);
};

export const getLocalEnv = () => {
  return env;
};
