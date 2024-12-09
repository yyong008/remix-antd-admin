import type { Op } from "@/types/restful";
import { linkCategoryService } from "~/services/admin/profile/LinkCategoryService";
import { remixApi } from "~/utils/server/remixApi";

// import { blogCategoryPermissions as perm } from "@/constants/permission";

const options: Op = {
  GET: {
    isPublic: false,
    perm: "",
    // perm: perm.READ_LIST,
    handler: linkCategoryService.getList,
  },
  POST: {
    isPublic: false,
    // perm: perm.CREATE,
    handler: linkCategoryService.create,
  },
  PUT: {
    isPublic: false,
    // perm: perm.UPDATE,
    handler: linkCategoryService.update,
  },
  DELETE: {
    isPublic: false,
    // perm: perm.DELETE,
    handler: linkCategoryService.deleteByIds,
  },
};

export const { loader, action } = remixApi.createApi(options);
