import type { Op } from "@/types/restful";
import { monitorLoginLogService } from "~/services/admin/system/MonitorServeService";
import { remixApi } from "~/utils/server/remixApi";
// import { blogCategoryPermissions as perm } from "@/constants/permission";

const options: Op = {
  GET: {
    isPublic: false,
    perm: "",
    // perm: perm.READ_LIST,
    handler: monitorLoginLogService.getList,
  },
};

export const { loader, action } = remixApi.createApi(options);
