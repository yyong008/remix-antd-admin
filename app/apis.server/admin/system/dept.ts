import { Hono } from "hono";

export const deptRouter = new Hono();

deptRouter.get("/dept", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

deptRouter.get("/dept/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

deptRouter.post("/dept", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

deptRouter.put("/dept/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

deptRouter.delete("/dept", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

deptRouter.delete("/dept/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});
