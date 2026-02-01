import { Hono } from "hono";
import { logger} from "hono/logger";
import { v1Router } from "./routes";
import { uploadHandler } from "./routes/upload";

export const app = new Hono().basePath("/api");

app.use("*", logger());

app.route("/", v1Router);

app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

app.post("/upload", uploadHandler);

export type AppType = typeof app;
