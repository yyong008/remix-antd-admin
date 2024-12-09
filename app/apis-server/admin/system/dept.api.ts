import type { Op } from "@/types/restful";
import { deptService } from "~/services/admin/system/DeptService";
import { remixApi } from "~/utils/server/remixApi";

// import { blogCategoryPermissions as perm } from "@/constants/permission";

const options: Op = {
  GET: {
    isPublic: false,
    perm: "",
    // perm: perm.READ_LIST,
    handler: deptService.getList,
  },
  POST: {
    isPublic: false,
    // perm: perm.CREATE,
    handler: deptService.create,
  },
  PUT: {
    isPublic: false,
    // perm: perm.UPDATE,
    handler: deptService.update,
  },
  DELETE: {
    isPublic: false,
    // perm: perm.DELETE,
    handler: deptService.deleteByIds,
  },
};

export const { loader, action } = remixApi.createApi(options);
