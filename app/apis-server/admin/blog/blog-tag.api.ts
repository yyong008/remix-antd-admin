// import { blogTagPermissions as perm } from "~/constants/permission";

import type { Op } from "@/types/restful";
import { blogTagService } from "~/services/admin/blog/BlogTagService";
import { remixApi } from "~/utils/server/remixApi";

const options: Op = {
  GET: {
    isPublic: false,
    perm: "",
    // perm: perm.READ_LIST,
    handler: blogTagService.getList,
  },
  POST: {
    isPublic: false,
    // perm: perm.CREATE,
    handler: blogTagService.create,
  },
  PUT: {
    isPublic: false,
    // perm: perm.UPDATE,
    handler: blogTagService.update,
  },
  DELETE: {
    isPublic: false,
    // perm: perm.DELETE,
    handler: blogTagService.deleteByIds,
  },
};

export const { loader, action } = remixApi.createApi(options);
