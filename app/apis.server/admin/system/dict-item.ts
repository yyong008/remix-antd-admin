import { Hono } from "hono";

export const dictItemRouter = new Hono();

dictItemRouter.get("/dict-item", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

dictItemRouter.get("/dict-item/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

dictItemRouter.post("/dict-item", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

dictItemRouter.put("/dict-item/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

dictItemRouter.delete("/dict-item/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

dictItemRouter.delete("/dict-item", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});
