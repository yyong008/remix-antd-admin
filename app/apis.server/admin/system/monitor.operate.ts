import { ReactRouterApi } from "../../ReactRouterApi";

export const monitorOperateRouter = new ReactRouterApi();

monitorOperateRouter.get("/monitor/operate", (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

monitorOperateRouter.get("/monitor/operate/:id", (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

monitorOperateRouter.post("/monitor/operate", (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

monitorOperateRouter.put("/monitor/operate/:id", (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

monitorOperateRouter.delete("/monitor/operate", (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

monitorOperateRouter.delete("/monitor/operate/:id", (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});
