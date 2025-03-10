import { Hono } from "hono";

export const dictRouter = new Hono();

dictRouter.get("/dict", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

dictRouter.get("/dict/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

dictRouter.post("/dict", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

dictRouter.put("/dict/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

dictRouter.delete("/dict", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

dictRouter.delete("/dict/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});
