import { Hono } from "hono";

export const commonRouter = new Hono();

commonRouter.get("/healthcheck", async () => {
  //
});

commonRouter.post("/upload", async () => {
  //
});
