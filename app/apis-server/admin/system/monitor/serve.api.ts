import type { Op } from "@/types/restful";
import { monitorLoginLogService } from "@/services/admin/system/MonitorServeService";
import { permissions } from "@/constants/permission";
import { remixApi } from "@/utils/server/remixApi";
import { schemas } from "~/schemas";

const options: Op = {
  GET: {
    isPublic: false,
    schemas: {
      url: schemas.admin.system.monitor.serve.READ_LIST,
    },
    perm: permissions.admin.system.monitor.serve.READ_LIST,
    handler: monitorLoginLogService.getList,
  },
};

export const { loader, action } = remixApi.createApi(options);
