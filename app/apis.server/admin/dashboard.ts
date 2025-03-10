import { Hono } from "hono";
import { dashboardServices } from "@/services/admin/dashboard";
export const dashboardRouter = new Hono();

dashboardRouter.get("/", async (c) => {
  try {
    const req = c.req.raw;
    const data = await dashboardServices.getDashboardData(req);
    return c.json({
      data,
      message: "success",
      code: 0,
    });
  } catch (error) {
    return c.json({
      data: null,
      message: (error as Error).message ?? "获取失败",
      code: 1,
    });
  }
});
