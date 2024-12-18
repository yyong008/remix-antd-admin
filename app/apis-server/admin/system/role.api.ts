import type { Op } from "@/types/restful";
import { permissions } from "@/constants/permission";
import { remixApi } from "@/utils/server/remixApi";
import { roleService } from "@/services/admin/system/RoleService";
import { schemas } from "@/schemas";

const options: Op = {
  GET: {
    isPublic: false,
    perm: permissions.admin.system.role.READ_LIST,
    schemas: {
      url: schemas.admin.system.role.READ_LIST,
    },
    handler: roleService.getList,
  },
  POST: {
    isPublic: false,
    schemas: {
      body: schemas.admin.system.role.CREATE,
    },
    perm: permissions.admin.system.role.CREATE,
    handler: roleService.create,
  },
  PUT: {
    isPublic: false,
    schemas: {
      body: schemas.admin.system.role.UPDATE,
    },
    perm: permissions.admin.system.role.UPDATE,
    handler: roleService.update,
  },
  DELETE: {
    isPublic: false,
    schemas: {
      body: schemas.admin.system.role.DELETE,
    },
    perm: permissions.admin.system.role.DELETE,
    handler: roleService.deleteByIds,
  },
};

export const { loader, action } = remixApi.createApi(options);
