import { ReactRouterApi } from "./ReactRouterApi";

export const commonRouter = new ReactRouterApi();

commonRouter.get("/healthcheck", async (c) => {
  //
});

commonRouter.get("/upload", async (c) => {});
