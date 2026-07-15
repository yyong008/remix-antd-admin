import { createAuth } from "../server";
import { getLocalDb, getLocalEnv } from "@workspace/seed/local/auth";

const db = getLocalDb();
const env = getLocalEnv();
export const auth = createAuth(db, env);
