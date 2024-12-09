import type { Op } from "@/types/restful";
import { linkService } from "~/services/admin/profile/LinkService";
import { remixApi } from "~/utils/server/remixApi";

// import { blogCategoryPermissions as perm } from "@/constants/permission";

const options: Op = {
  GET: {
    isPublic: false,
    perm: "",
    // perm: perm.READ_LIST,
    handler: linkService.getList,
  },
  POST: {
    isPublic: false,
    // perm: perm.CREATE,
    handler: linkService.create,
  },
  PUT: {
    isPublic: false,
    // perm: perm.UPDATE,
    handler: linkService.update,
  },
  DELETE: {
    isPublic: false,
    // perm: perm.DELETE,
    handler: linkService.deleteByIds,
  },
};

export const { loader, action } = remixApi.createApi(options);
