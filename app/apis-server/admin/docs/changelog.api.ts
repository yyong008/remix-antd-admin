import type { Op } from "@/types/restful";
import { changeLogService } from "~/services/admin/docs/ChangelogService";
import { remixApi } from "~/utils/server/remixApi";

// import { blogCategoryPermissions as perm } from "@/constants/permission";

const options: Op = {
  GET: {
    isPublic: false,
    perm: "",
    // perm: perm.READ_LIST,
    handler: changeLogService.getList,
  },
  POST: {
    isPublic: false,
    // perm: perm.CREATE,
    handler: changeLogService.create,
  },
  PUT: {
    isPublic: false,
    // perm: perm.UPDATE,
    handler: changeLogService.update,
  },
  DELETE: {
    isPublic: false,
    // perm: perm.DELETE,
    handler: changeLogService.deleteByIds,
  },
};

export const { loader, action } = remixApi.createApi(options);
