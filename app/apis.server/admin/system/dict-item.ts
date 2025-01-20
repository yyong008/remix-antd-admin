import { ReactRouterApi } from "../../ReactRouterApi";

export const dictItemRouter = new ReactRouterApi();

dictItemRouter.get("/dict-item", (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

dictItemRouter.get("/dict-item/:id", (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

dictItemRouter.post("/dict-item", (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

dictItemRouter.put("/dict-item/:id", (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

dictItemRouter.delete("/dict-item/:id", (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

dictItemRouter.delete("/dict-item", (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});
