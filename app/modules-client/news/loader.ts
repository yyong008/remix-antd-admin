import type { Op } from "@/types/restful";
import { newsService } from "@/services/admin/news/NewsService";
import { remixApi } from "@/utils/server/remixApi";

// import { blogCategoryPermissions as perm } from "@/constants/permission";

const options: Op = {
  GET: {
    isPublic: true,
    perm: "",
    handler: newsService.getList,
  },
};

export const { loader } = remixApi.createApi(options);
