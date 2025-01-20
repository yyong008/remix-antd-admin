import { ReactRouterApi } from "../../ReactRouterApi";

export const monitorServeRouter = new ReactRouterApi();

monitorServeRouter.get("/monitor/serve", (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

monitorServeRouter.get("/monitor/serve/:id", (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

monitorServeRouter.post("/monitor/serve", (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

monitorServeRouter.put("/monitor/serve/:id", (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

monitorServeRouter.delete("/monitor/serve", (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

monitorServeRouter.delete("/monitor/serve/:id", (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});
