import { Hono } from "hono";

export const toolMailRouter = new Hono();

toolMailRouter.get("/tool/mail", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

toolMailRouter.get("/tool/mail/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

toolMailRouter.post("/tool/mail", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

toolMailRouter.put("/tool/mail/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

toolMailRouter.delete("/tool/mail", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

toolMailRouter.delete("/tool/mail/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});
