import { ReactRouterApi } from "../ReactRouterApi";
import { dashboardServices } from "@/services/admin/dashboard";
export const dashboardRouter = new ReactRouterApi();

dashboardRouter.get("/dashboard", async (c) => {
  try {
    const args = c.reactRouterArgs;
    const data = await dashboardServices.getDashboardData(args);
    return c.js(data!);
  } catch (error) {
    return c.error(error as Error);
  }
});
