import type { Op } from "@/types/restful";
import { dictItemService } from "@/services/admin/system/DictItemService";
import { permissions } from "@/constants/permission";
import { remixApi } from "@/utils/server/remixApi";
import { schemas } from "@/schemas";

const options: Op = {
  GET: {
    isPublic: false,
    schemas: {
      url: schemas.admin.system.dictItem.READ_LIST,
    },
    perm: permissions.admin.system.dictItem.READ_LIST,
    handler: dictItemService.getList.bind(dictItemService),
  },
  POST: {
    isPublic: false,
    schemas: {
      body: schemas.admin.system.dictItem.CREATE,
    },
    perm: permissions.admin.system.dictItem.CREATE,
    handler: dictItemService.create.bind(dictItemService),
  },
  PUT: {
    isPublic: false,
    schemas: {
      body: schemas.admin.system.dictItem.UPDATE,
    },
    perm: permissions.admin.system.dictItem.UPDATE,
    handler: dictItemService.update.bind(dictItemService),
  },
  DELETE: {
    isPublic: false,
    schemas: {
      body: schemas.admin.system.dictItem.DELETE,
    },
    perm: permissions.admin.system.dictItem.DELETE,
    handler: dictItemService.deleteByIds.bind(dictItemService),
  },
};

export const { loader, action } = remixApi.createApi(options);
