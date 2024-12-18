import type { Op } from "@/types/restful";
import { linkCategoryService } from "@/services/admin/profile/LinkCategoryService";
import { permissions } from "@/constants/permission";
import { remixApi } from "@/utils/server/remixApi";
import { schemas } from "@/schemas";

const options: Op = {
  GET: {
    isPublic: false,
    schemas: {
      url: schemas.admin.system.config.READ_LIST,
    },
    perm: permissions.admin.system.config.READ_LIST,
    handler: linkCategoryService.getList,
  },
  POST: {
    isPublic: false,
    schemas: {
      body: schemas.admin.system.config.CREATE,
    },
    perm: permissions.admin.system.config.CREATE,
    handler: linkCategoryService.create,
  },
  PUT: {
    isPublic: false,
    schemas: {
      body: schemas.admin.system.config.UPDATE,
    },
    perm: permissions.admin.system.config.UPDATE,
    handler: linkCategoryService.update,
  },
  DELETE: {
    isPublic: false,
    schemas: {
      body: schemas.admin.system.config.DELETE,
    },
    perm: permissions.admin.system.config.DELETE,
    handler: linkCategoryService.deleteByIds,
  },
};

export const { loader, action } = remixApi.createApi(options);
