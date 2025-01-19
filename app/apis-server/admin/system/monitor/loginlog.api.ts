import type { Op } from "@/types/restful";
import { monitorLoginLogService } from "@/services/admin/system/MonitorLoginlogService";
import { permissions } from "@/constants/permission";
import { remixApi } from "@/utils/server/remixApi";
import { schemas } from "~/schemas";

const options: Op = {
  GET: {
    isPublic: false,
    schemas: {
      url: schemas.admin.system.monitor.loginlog.READ_LIST,
    },
    perm: permissions.admin.system.monitor.loginlog.READ_LIST,
    handler: monitorLoginLogService.getList.bind(monitorLoginLogService),
  },
};

export const { loader, action } = remixApi.createApi(options);
