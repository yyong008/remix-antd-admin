import { Hono } from "hono";
import { logger} from "hono/logger";
import { v1Router } from "./routes";
import { uploadHandler } from "./upload";

export const app = new Hono();

app.use("*", logger());

app.route("/api", v1Router);

app.get("/api/health", (c) => {
  return c.json({ status: "ok" });
});

app.post("/api/upload", uploadHandler);

export type AppType = typeof app;
