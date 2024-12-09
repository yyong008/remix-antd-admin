import type { Op } from "@/types/restful";
import { newsService } from "~/services/admin/news/NewsService";
import { remixApi } from "~/utils/server/remixApi";

// import { blogPermissions as perm } from "@/constants/permission";

const options: Op = {
  GET: {
    isPublic: false,
    perm: "",
    // perm: perm.READ_LIST,
    handler: newsService.getById,
  },
};

export const { loader } = remixApi.createApi(options);
