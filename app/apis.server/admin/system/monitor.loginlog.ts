import { Hono } from "hono";

export const monitorLoginLogRouter = new Hono();

monitorLoginLogRouter.get("/monitor/loginlog", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

monitorLoginLogRouter.get("/monitor/loginlog/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

monitorLoginLogRouter.post("/monitor/loginlog", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

monitorLoginLogRouter.put("/monitor/loginlog/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

monitorLoginLogRouter.delete("/monitor/loginlog/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

monitorLoginLogRouter.delete("/monitor/loginlog", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});
