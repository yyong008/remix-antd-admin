import type { Op } from "@/types/restful";
import { blogService } from "~/services/admin/blog/BlogService";
import { remixApi } from "~/utils/server/remixApi";

// import { blogPermissions as perm } from "@/constants/permission";

const options: Op = {
  GET: {
    isPublic: false,
    perm: "",
    // perm: perm.READ_LIST,
    handler: blogService.getList,
  },
  POST: {
    isPublic: false,
    // perm: perm.CREATE,
    handler: blogService.create,
  },
  PUT: {
    isPublic: false,
    // perm: perm.UPDATE,
    handler: blogService.update,
  },
  DELETE: {
    isPublic: false,
    // perm: perm.DELETE,
    handler: blogService.deleteByIds,
  },
};

export const { loader, action } = remixApi.createApi(options);
