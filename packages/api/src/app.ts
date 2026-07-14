import type { HonoEnv } from "./types";

import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { v1Router } from "./routes";
import { uploadHandler } from "./routes/upload";
import { storageObjectHandler } from "./routes/storage-object";
import { authMiddleware } from "./middleware/auth";

export const app = new Hono<HonoEnv>()
  .basePath("/api")
  .use("*", logger())
  .use(
    "*",
    cors({
      credentials: true,
      origin: (origin) => origin || "*",
    }),
  )
  .route("/", v1Router)
  .get("/health", (c) => {
    return c.json({ status: "ok" });
  })
  .get("/storage/object", storageObjectHandler)
  .post("/upload", authMiddleware, uploadHandler);
