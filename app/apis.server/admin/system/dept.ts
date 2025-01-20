import { ReactRouterApi } from "../../ReactRouterApi";

export const deptRouter = new ReactRouterApi();

deptRouter.get("/dept", (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

deptRouter.get("/dept/:id", (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

deptRouter.post("/dept", (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

deptRouter.put("/dept/:id", (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

deptRouter.delete("/dept", (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

deptRouter.delete("/dept/:id", (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});
