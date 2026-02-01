/**
 * https://opennext.js.org/cloudflare/howtos/db
 *
 * neon
 * https://orm.drizzle.team/docs/connect-neon
 *
 * For Cloudflare Workers, use HTTP connection (neon-http) instead of WebSocket
 * WebSocket (ws package) is not compatible with Cloudflare Workers runtime
 */
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle({ client: sql });
