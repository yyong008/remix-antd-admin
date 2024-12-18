import type { Op } from "@/types/restful";
import { linkService } from "@/services/admin/profile/LinkService";
import { permissions } from "@/constants/permission";
import { remixApi } from "@/utils/server/remixApi";
import { schemas } from "@/schemas";

const options: Op = {
  GET: {
    isPublic: false,
    perm: permissions.admin.profile.link.categoryLink.READ_LIST,
    schemas: {
      url: schemas.admin.profile.link.link.READ_LIST,
    },
    handler: linkService.getList,
  },
  POST: {
    isPublic: false,
    perm: permissions.admin.profile.link.categoryLink.CREATE,
    schemas: {
      body: schemas.admin.profile.link.link.CREATE,
    },
    handler: linkService.create,
  },
  PUT: {
    isPublic: false,
    perm: permissions.admin.profile.link.categoryLink.UPDATE,
    schemas: {
      body: schemas.admin.profile.link.link.UPDATE,
    },
    handler: linkService.update,
  },
  DELETE: {
    isPublic: false,
    perm: permissions.admin.profile.link.categoryLink.DELETE,
    schemas: {
      body: schemas.admin.profile.link.link.DELETE,
    },
    handler: linkService.deleteByIds,
  },
};

export const { loader, action } = remixApi.createApi(options);
