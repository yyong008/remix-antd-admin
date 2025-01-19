import type { Op } from "@/types/restful";
import { permissions } from "@/constants/permission";
import { remixApi } from "@/utils/server/remixApi";
import { schemas } from "~/schemas";
import { userService } from "@/services/admin/system/UserService";

const options: Op = {
  GET: {
    isPublic: false,
    perm: permissions.admin.system.user.READ_LIST,
    schemas: {
      url: schemas.admin.system.user.READ_LIST,
    },
    handler: userService.getList.bind(userService),
  },
  POST: {
    isPublic: false,
    perm: permissions.admin.system.user.CREATE,
    schemas: {
      body: schemas.admin.system.user.CREATE,
    },
    handler: userService.create.bind(userService),
  },
  PUT: {
    isPublic: false,
    schemas: {
      body: schemas.admin.system.user.UPDATE,
    },
    perm: permissions.admin.system.user.UPDATE,
    handler: userService.update.bind(userService),
  },
  DELETE: {
    isPublic: false,
    schemas: {
      body: schemas.admin.system.user.DELETE,
    },
    perm: permissions.admin.system.user.DELETE,
    handler: userService.deleteByIds.bind(userService),
  },
};

export const { loader, action } = remixApi.createApi(options);
