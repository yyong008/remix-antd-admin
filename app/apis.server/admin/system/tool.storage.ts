import { Hono } from "hono";

export const toolStorageRouter = new Hono();

toolStorageRouter.get("/tool/storage", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

toolStorageRouter.get("/tool/storage/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

toolStorageRouter.post("/tool/storage", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

toolStorageRouter.put("/tool/storage/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

toolStorageRouter.delete("/tool/storage", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

toolStorageRouter.delete("/tool/storage/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});
