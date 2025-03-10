import { Hono } from "hono";

export const menuRoleRouter = new Hono();

menuRoleRouter.get("/menu-role", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

menuRoleRouter.get("/menu-role/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

menuRoleRouter.post("/menu-role", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

menuRoleRouter.put("/menu-role/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

menuRoleRouter.delete("/menu-role", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});

menuRoleRouter.delete("/menu-role/:id", async (c) => {
  try {
  } catch (error) {
    return c.json(error as Error);
  }
});
