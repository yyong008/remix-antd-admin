import type { Op } from "@/types/restful";
import { newsService } from "~/services/admin/news/NewsService";
import { remixApi } from "~/utils/server/remixApi";

// import { blogPermissions as perm } from "@/constants/permission";

const options: Op = {
  GET: {
    isPublic: false,
    perm: "",
    // perm: perm.READ_LIST,
    handler: newsService.getList,
  },
  POST: {
    isPublic: false,
    // perm: perm.CREATE,
    handler: newsService.create,
  },
  PUT: {
    isPublic: false,
    // perm: perm.UPDATE,
    handler: newsService.update,
  },
  DELETE: {
    isPublic: false,
    // perm: perm.DELETE,
    handler: newsService.deleteByIds,
  },
};

export const { loader, action } = remixApi.createApi(options);
