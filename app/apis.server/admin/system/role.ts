import { Hono } from "hono";

export const roleRouter = new Hono();

roleRouter.get("/role", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

roleRouter.get("/role/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

roleRouter.post("/role", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

roleRouter.put("/role/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

roleRouter.delete("/role", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

roleRouter.delete("/role/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});
