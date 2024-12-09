import type { Op } from "@/types/restful";
import { dashboardServices } from "@/services/admin/dashboard";
import { remixApi } from "~/utils/server/remixApi";

const options: Op = {
  GET: {
    isPublic: false,
    perm: "",
    handler: dashboardServices.getDashboardData.bind(dashboardServices),
  },
};

export const { loader } = remixApi.createApi(options);
