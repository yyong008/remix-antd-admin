import type { Op } from "@/types/restful";
import { menuService } from "@/services/admin/system/MenuService";
import { permissions } from "@/constants/permission";
import { remixApi } from "@/utils/server/remixApi";
import { schemas } from "@/schemas";

const options: Op = {
  GET: {
    isPublic: false,
    schemas: {
      url: schemas.admin.system.menu.READ_LIST,
    },
    perm: permissions.admin.system.menu.READ_LIST,
    handler: menuService.getMenuTree.bind(menuService),
  },
  POST: {
    isPublic: false,
    schemas: {
      body: schemas.admin.system.menu.CREATE,
    },
    perm: permissions.admin.system.menu.CREATE,
    handler: menuService.create.bind(menuService),
  },
  PUT: {
    isPublic: false,
    schemas: {
      body: schemas.admin.system.menu.UPDATE,
    },
    perm: permissions.admin.system.menu.UPDATE,
    handler: menuService.update.bind(menuService),
  },
  DELETE: {
    isPublic: false,
    schemas: {
      url: schemas.admin.system.menu.DELETE,
    },
    perm: permissions.admin.system.menu.DELETE,
    handler: menuService.delete.bind(menuService),
  },
};

export const { loader, action } = remixApi.createApi(options);
