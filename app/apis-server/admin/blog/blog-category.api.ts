import type { Op } from "@/types/restful";
import { blogCategoryService } from "~/services/admin/blog/BlogCategoryService";
import { remixApi } from "~/utils/server/remixApi";

// import { blogCategoryPermissions as perm } from "@/constants/permission";

const options: Op = {
  GET: {
    isPublic: false,
    perm: "",
    // perm: perm.READ_LIST,
    handler: blogCategoryService.getById,
  },
  POST: {
    isPublic: false,
    // perm: perm.CREATE,
    handler: blogCategoryService.create,
  },
  PUT: {
    isPublic: false,
    // perm: perm.UPDATE,
    handler: blogCategoryService.update,
  },
  DELETE: {
    isPublic: false,
    // perm: perm.DELETE,
    handler: blogCategoryService.deleteByIds,
  },
};

export const { loader, action } = remixApi.createApi(options);
