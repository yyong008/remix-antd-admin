import { Hono } from "hono";

export const monitorOperateRouter = new Hono();

monitorOperateRouter.get("/monitor/operate", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

monitorOperateRouter.get("/monitor/operate/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

monitorOperateRouter.post("/monitor/operate", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

monitorOperateRouter.put("/monitor/operate/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

monitorOperateRouter.delete("/monitor/operate", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

monitorOperateRouter.delete("/monitor/operate/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});
