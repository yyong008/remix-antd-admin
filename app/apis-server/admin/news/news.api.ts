import type { Op } from "@/types/restful";
import { newsService } from "@/services/admin/news/NewsService";
import { permissions } from "@/constants/permission";
import { remixApi } from "@/utils/server/remixApi";
import { schemas } from "@/schemas";

const options: Op = {
  GET: {
    isPublic: false,
    perm: permissions.admin.news.news.READ_LIST,
    schemas: {
      url: schemas.admin.news.news.READ_LIST,
    },
    handler: newsService.getList,
  },
  POST: {
    isPublic: false,
    perm: permissions.admin.news.news.CREATE,
    schemas: {
      body: schemas.admin.news.news.CREATE,
    },
    handler: newsService.create,
  },
  PUT: {
    isPublic: false,
    perm: permissions.admin.news.news.UPDATE,
    schemas: {
      body: schemas.admin.news.news.UPDATE,
    },
    handler: newsService.update,
  },
  DELETE: {
    isPublic: false,
    perm: permissions.admin.news.news.DELETE,
    schemas: {
      body: schemas.admin.news.news.DELETE,
    },
    handler: newsService.deleteByIds,
  },
};

export const { loader, action } = remixApi.createApi(options);
