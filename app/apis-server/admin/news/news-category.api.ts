import type { Op } from "@/types/restful";
import { newsCategoryService } from "~/services/admin/news/NewsCategoryService";
import { remixApi } from "~/utils/server/remixApi";

// import { blogCategoryPermissions as perm } from "@/constants/permission";

const options: Op = {
  GET: {
    isPublic: false,
    perm: "",
    // perm: perm.READ_LIST,
    handler: newsCategoryService.getList,
  },
  POST: {
    isPublic: false,
    // perm: perm.CREATE,
    handler: newsCategoryService.create,
  },
  PUT: {
    isPublic: false,
    // perm: perm.UPDATE,
    handler: newsCategoryService.update,
  },
  DELETE: {
    isPublic: false,
    // perm: perm.DELETE,
    handler: newsCategoryService.deleteByIds,
  },
};

export const { loader, action } = remixApi.createApi(options);
