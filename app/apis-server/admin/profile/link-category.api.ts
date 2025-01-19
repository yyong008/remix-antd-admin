import type { Op } from "@/types/restful";
import { linkCategoryService } from "@/services/admin/profile/LinkCategoryService";
import { permissions } from "@/constants/permission";
import { remixApi } from "@/utils/server/remixApi";
import { schemas } from "~/schemas";

const options: Op = {
  GET: {
    isPublic: false,
    perm: permissions.admin.profile.link.category.READ_LIST,
    schemas: {
      url: schemas.admin.profile.link.linkCategory.READ_LIST,
    },
    handler: linkCategoryService.getList,
  },
  POST: {
    isPublic: false,
    perm: permissions.admin.profile.link.category.UPDATE,
    schemas: {
      body: schemas.admin.profile.link.linkCategory.UPDATE,
    },
    handler: linkCategoryService.create,
  },
  PUT: {
    isPublic: false,
    perm: permissions.admin.profile.link.category.UPDATE,
    schemas: {
      body: schemas.admin.profile.link.linkCategory.UPDATE,
    },
    handler: linkCategoryService.update,
  },
  DELETE: {
    isPublic: false,
    perm: permissions.admin.profile.link.category.DELETE,
    schemas: {
      body: schemas.admin.profile.link.linkCategory.DELETE,
    },
    handler: linkCategoryService.deleteByIds,
  },
};

export const { loader, action } = remixApi.createApi(options);
