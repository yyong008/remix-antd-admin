import type { Op } from "@/types/restful";
import { newsService } from "@/services/admin/news/NewsService";
import { permissions } from "@/constants/permission";
import { remixApi } from "@/utils/server/remixApi";
import { schemas } from "@/schemas";

const options: Op = {
  GET: {
    isPublic: false,
    schemas: {
      url: schemas.admin.news.news.READ,
    },
    perm: permissions.admin.news.news.READ,
    handler: newsService.getById,
  },
};

export const { loader } = remixApi.createApi(options);
