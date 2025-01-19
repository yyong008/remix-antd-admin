import type { Op } from "@/types/restful";
import { blogService } from "@/services/admin/blog/BlogService";
import { permissions } from "@/constants/permission";
import { remixApi } from "@/utils/server/remixApi";
import { schemas } from "~/schemas";

const options: Op = {
  GET: {
    isPublic: false,
    perm: permissions.admin.blog.blog.READ_LIST,
    schemas: {
      url: schemas.admin.blog.blog.READ_LIST,
    },
    handler: blogService.getList,
  },
  POST: {
    isPublic: false,
    perm: permissions.admin.blog.blog.CREATE,
    schemas: {
      body: schemas.admin.blog.blog.CREATE,
    },
    handler: blogService.create,
  },
  PUT: {
    isPublic: false,
    perm: permissions.admin.blog.blog.UPDATE,
    schemas: {
      body: schemas.admin.blog.blog.UPDATE,
    },
    handler: blogService.update,
  },
  DELETE: {
    isPublic: false,
    perm: permissions.admin.blog.blog.DELETE,
    schemas: {
      body: schemas.admin.blog.blog.DELETE,
    },
    handler: blogService.deleteByIds,
  },
};

export const { loader, action } = remixApi.createApi(options);
