import type { Op } from "@/types/restful";
import { newsCategoryService } from "@/services/admin/news/NewsCategoryService";
import { permissions } from "@/constants/permission";
import { remixApi } from "@/utils/server/remixApi";
import { schemas } from "@/schemas";

const options: Op = {
  GET: {
    isPublic: false,
    perm: permissions.admin.news.category.READ_LIST,
    schemas: {
      url: schemas.admin.news.category.READ_LIST,
    },
    handler: newsCategoryService.getList,
  },
  POST: {
    isPublic: false,
    perm: permissions.admin.news.category.CREATE,
    schemas: {
      body: schemas.admin.news.category.CREATE,
    },
    handler: newsCategoryService.create,
  },
  PUT: {
    isPublic: false,
    perm: permissions.admin.news.category.UPDATE,
    schemas: {
      body: schemas.admin.news.category.UPDATE,
    },
    handler: newsCategoryService.update,
  },
  DELETE: {
    isPublic: false,
    perm: permissions.admin.news.category.DELETE,
    schemas: {
      body: schemas.admin.news.category.DELETE,
    },
    handler: newsCategoryService.deleteByIds,
  },
};

export const { loader, action } = remixApi.createApi(options);
