import type { Op } from "@/types/restful";
import { remixApi } from "@/utils/server/remixApi";
import { roleService } from "~/services/admin/system/RoleService";
// import { blogCategoryPermissions as perm } from "@/constants/permission";

const options: Op = {
  GET: {
    isPublic: false,
    perm: "",
    // perm: perm.READ_LIST,
    handler: roleService.getList,
  },
  POST: {
    isPublic: false,
    // perm: perm.CREATE,
    handler: roleService.create,
  },
  PUT: {
    isPublic: false,
    // perm: perm.UPDATE,
    handler: roleService.update,
  },
  DELETE: {
    isPublic: false,
    // perm: perm.DELETE,
    handler: roleService.deleteByIds,
  },
};

export const { loader, action } = remixApi.createApi(options);
