import { ReactRouterApi } from "../ReactRouterApi";

export const blogRouter = new ReactRouterApi();

blogRouter.get("/blog", async (c) => {
  // TODO
});
blogRouter.get("/blog/:id", async (c) => {
  // TODO
});
blogRouter.post("/blog", async (c) => {
  // TODO
});
blogRouter.put("/blog/:id", async (c) => {
  // TODO
});
blogRouter.delete("/blog/:id", async (c) => {
  // TODO
});

blogRouter.delete("blog", async (c) => {
  // TODO
});

blogRouter.get("/blog/tag", async (c) => {
  //
});
blogRouter.get("/blog/tag/:id", async (c) => {
  //
});
blogRouter.post("/blog/tag", async (c) => {
  //
});
blogRouter.put("/blog/tag/:id", async (c) => {});
blogRouter.delete("/blog/tag/:id", async (c) => {
  //
});
blogRouter.delete("/blog/tag", async (c) => {
  //
});

blogRouter.get("/blog/category", async (c) => {
  //
});
blogRouter.get("/blog/category/:id", async (c) => {
  //
});
blogRouter.post("/blog/category", async (c) => {});
blogRouter.put("/blog/category/:id", async (c) => {});
blogRouter.delete("/blog/category/:id", async (c) => {});
blogRouter.delete("/blog/category", async (c) => {
  //
});
