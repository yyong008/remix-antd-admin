import type { Op } from "@/types/restful";
import { blogTagService } from "@/services/admin/blog/BlogTagService";
import { permissions } from "@/constants/permission";
import { remixApi } from "@/utils/server/remixApi";
import { schemas } from "~/schemas";

const options: Op = {
  GET: {
    isPublic: false,
    perm: permissions.admin.blog.tag.READ_LIST,
    schemas: {
      url: schemas.admin.blog.tag.READ_LIST,
    },
    handler: blogTagService.getList,
  },
  POST: {
    isPublic: false,
    schemas: {
      body: schemas.admin.blog.tag.CREATE,
    },
    perm: permissions.admin.blog.tag.CREATE,
    handler: blogTagService.create,
  },
  PUT: {
    isPublic: false,
    schemas: {
      body: schemas.admin.blog.tag.UPDATE,
    },
    perm: permissions.admin.blog.tag.UPDATE,
    handler: blogTagService.update,
  },
  DELETE: {
    isPublic: false,
    schemas: {
      body: schemas.admin.blog.tag.DELETE,
    },
    perm: permissions.admin.blog.tag.DELETE,
    handler: blogTagService.deleteByIds,
  },
};

export const { loader, action } = remixApi.createApi(options);
