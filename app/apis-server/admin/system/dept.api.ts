import type { Op } from "@/types/restful";
import { deptService } from "@/services/admin/system/DeptService";
import { permissions } from "@/constants/permission";
import { remixApi } from "@/utils/server/remixApi";
import { schemas } from "~/schemas";

const options: Op = {
  GET: {
    isPublic: false,
    schemas: {
      url: schemas.admin.system.dept.READ_LIST,
    },
    perm: permissions.admin.system.dept.READ_LIST,
    handler: deptService.getList,
  },
  POST: {
    isPublic: false,
    schemas: {
      body: schemas.admin.system.dept.CREATE,
    },
    perm: permissions.admin.system.dept.CREATE,
    handler: deptService.create,
  },
  PUT: {
    isPublic: false,
    schemas: {
      body: schemas.admin.system.dept.UPDATE,
    },
    perm: permissions.admin.system.dept.UPDATE,
    handler: deptService.update,
  },
  DELETE: {
    isPublic: false,
    schemas: {
      body: schemas.admin.system.dept.DELETE,
    },
    perm: permissions.admin.system.dept.DELETE,
    handler: deptService.deleteByIds,
  },
};

export const { loader, action } = remixApi.createApi(options);
