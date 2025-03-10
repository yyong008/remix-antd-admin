import { Hono } from "hono";

export const monitorServeRouter = new Hono();

monitorServeRouter.get("/monitor/serve", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

monitorServeRouter.get("/monitor/serve/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

monitorServeRouter.post("/monitor/serve", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

monitorServeRouter.put("/monitor/serve/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

monitorServeRouter.delete("/monitor/serve", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

monitorServeRouter.delete("/monitor/serve/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});
