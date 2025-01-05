import type { Op } from "@/types/restful";
import { monitorOperateService } from "@/services/admin/system/MonitorOperateService";
import { permissions } from "@/constants/permission";
import { remixApi } from "@/utils/server/remixApi";
import { schemas } from "@/schemas";

const options: Op = {
  GET: {
    isPublic: false,
    schemas: {
      url: schemas.admin.system.monitor.operate.READ_LIST,
    },
    perm: permissions.admin.system.monitor.operate.READ_LIST,
    handler: monitorOperateService.getList.bind(monitorOperateService),
  },
};

export const { loader, action } = remixApi.createApi(options);
