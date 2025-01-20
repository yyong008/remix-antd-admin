import { ReactRouterApi } from "../../ReactRouterApi";

export const configRouter = new ReactRouterApi();

configRouter.get("/config", async (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

configRouter.get("/config/:id", async (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

configRouter.post("/config", async (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

configRouter.put("/config/:id", async (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

configRouter.delete("/config", async (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

configRouter.delete("/config/:id", async (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});
