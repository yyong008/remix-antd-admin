import type { Op } from "@/types/restful";
import { changeLogService } from "@/services/admin/docs/ChangelogService";
import { permissions } from "@/constants/permission";
import { remixApi } from "@/utils/server/remixApi";
import { schemas } from "~/schemas";

const options: Op = {
  GET: {
    isPublic: false,
    perm: permissions.admin.docs.changelog.READ_LIST,
    schemas: {
      url: schemas.admin.docs.changelog.READ_LIST,
    },
    handler: changeLogService.getList,
  },
  POST: {
    isPublic: false,
    schemas: {
      body: schemas.admin.docs.changelog.CREATE,
    },
    perm: permissions.admin.docs.changelog.CREATE,
    handler: changeLogService.create,
  },
  PUT: {
    isPublic: false,
    perm: permissions.admin.docs.changelog.UPDATE,
    schemas: {
      body: schemas.admin.docs.changelog.UPDATE,
    },
    handler: changeLogService.update,
  },
  DELETE: {
    isPublic: false,
    perm: permissions.admin.docs.changelog.DELETE,
    schemas: {
      body: schemas.admin.docs.changelog.DELETE,
    },
    handler: changeLogService.deleteByIds,
  },
};

export const { loader, action } = remixApi.createApi(options);
