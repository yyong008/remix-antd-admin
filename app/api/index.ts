import { Hono } from "hono";
import { logger } from "hono/logger";
import { v1Router } from "./routes";
import { uploadHandler } from "./routes/upload";
import { storageObjectHandler } from "./routes/storage-object";
import { authMiddleware } from "./middleware/auth";

export const app = new Hono<{ Bindings: { DB: D1Database; STORAGE?: R2Bucket } }>().basePath(
  "/api",
);

app.use("*", logger());

app.route("/", v1Router);

app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

app.get("/storage/object", storageObjectHandler);

app.post("/upload", authMiddleware, uploadHandler);

export type AppType = typeof app;
