import { Hono } from "hono";

export const menuRouter = new Hono();

menuRouter.get("/menu", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

menuRouter.get("/menu/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

menuRouter.post("/menu", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

menuRouter.put("/menu/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

menuRouter.delete("/menu", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

menuRouter.delete("/menu/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});
