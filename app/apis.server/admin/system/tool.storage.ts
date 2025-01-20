import { ReactRouterApi } from "../../ReactRouterApi";

export const toolStorageRouter = new ReactRouterApi();

toolStorageRouter.get("/tool/storage", async (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

toolStorageRouter.get("/tool/storage/:id", async (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

toolStorageRouter.post("/tool/storage", async (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

toolStorageRouter.put("/tool/storage/:id", async (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

toolStorageRouter.delete("/tool/storage", async (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});

toolStorageRouter.delete("/tool/storage/:id", async (c) => {
  try {
  } catch (error) {
    return c.jf(error as Error);
  }
});
