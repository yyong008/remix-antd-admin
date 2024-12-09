import type { Op } from "@/types/restful";
import { feedBackService } from "~/services/admin/docs/FeedbackService";
import { remixApi } from "~/utils/server/remixApi";

// import { blogCategoryPermissions as perm } from "@/constants/permission";

const options: Op = {
  GET: {
    isPublic: false,
    perm: "",
    // perm: perm.READ_LIST,
    handler: feedBackService.getList,
  },
  POST: {
    isPublic: false,
    // perm: perm.CREATE,
    handler: feedBackService.create,
  },
  PUT: {
    isPublic: false,
    // perm: perm.UPDATE,
    handler: feedBackService.update,
  },
  DELETE: {
    isPublic: false,
    // perm: perm.DELETE,
    handler: feedBackService.deleteByIds,
  },
};

export const { loader, action } = remixApi.createApi(options);
