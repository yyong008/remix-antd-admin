import type { Op } from "@/types/restful";
import { blogCategoryService } from "@/services/admin/blog/BlogCategoryService";
import { permissions } from "@/constants/permission";
import { remixApi } from "@/utils/server/remixApi";
import { schemas } from "@/schemas";

const options: Op = {
  GET: {
    isPublic: false,
    perm: permissions.admin.blog.category.READ_LIST,
    schemas: {
      url: schemas.admin.blog.category.READ_LIST,
    },
    handler: blogCategoryService.getListById,
  },
  POST: {
    isPublic: false,
    perm: permissions.admin.blog.category.CREATE,
    schemas: {
      body: schemas.admin.blog.category.CREATE,
    },
    handler: blogCategoryService.create,
  },
  PUT: {
    isPublic: false,
    perm: permissions.admin.blog.category.UPDATE,
    schemas: {
      body: schemas.admin.blog.category.UPDATE,
    },
    handler: blogCategoryService.update,
  },
  DELETE: {
    isPublic: false,
    perm: permissions.admin.blog.category.DELETE,
    schemas: {
      body: schemas.admin.blog.category.DELETE,
    },
    handler: blogCategoryService.deleteByIds,
  },
};

export const { loader, action } = remixApi.createApi(options);
