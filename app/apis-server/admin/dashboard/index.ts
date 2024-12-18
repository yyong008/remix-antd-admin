import type { Op } from "@/types/restful";
import { dashboardServices } from "@/services/admin/dashboard";
import { permissions } from "@/constants/permission";
import { remixApi } from "@/utils/server/remixApi";

const options: Op = {
  GET: {
    isPublic: false,
    perm: permissions.admin.dashboard.READ,
    schemas: {},
    handler: dashboardServices.getDashboardData.bind(dashboardServices),
  },
};

export const { loader } = remixApi.createApi(options);
