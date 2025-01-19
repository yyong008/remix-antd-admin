import type { Op } from "@/types/restful";
import { dictService } from "@/services/admin/system/DictService";
import { permissions } from "@/constants/permission";
import { remixApi } from "@/utils/server/remixApi";
import { schemas } from "~/schemas";

const options: Op = {
  GET: {
    isPublic: false,
    schemas: {
      url: schemas.admin.system.dict.READ_LIST,
    },
    perm: permissions.admin.system.dict.READ_LIST,
    handler: dictService.getList.bind(dictService),
  },
  POST: {
    isPublic: false,
    schemas: {
      body: schemas.admin.system.dict.CREATE,
    },
    perm: permissions.admin.system.dict.CREATE,
    handler: dictService.create.bind(dictService),
  },
  PUT: {
    isPublic: false,
    schemas: {
      body: schemas.admin.system.dict.UPDATE,
    },
    perm: permissions.admin.system.dict.UPDATE,
    handler: dictService.update.bind(dictService),
  },
  DELETE: {
    isPublic: false,
    schemas: {
      body: schemas.admin.system.dict.DELETE,
    },
    perm: permissions.admin.system.dict.DELETE,
    handler: dictService.deleteByIds.bind(dictService),
  },
};

export const { loader, action } = remixApi.createApi(options);
