import type { Op } from "@/types/restful";
import { dictItemService } from "@/services/admin/system/DictItemService";
import { remixApi } from "@/utils/server/remixApi";

// import { blogCategoryPermissions as perm } from "@/constants/permission";

const options: Op = {
  GET: {
    isPublic: false,
    perm: "",
    // perm: perm.READ_LIST,
    handler: dictItemService.getList.bind(dictItemService),
  },
  POST: {
    isPublic: false,
    perm: "",
    // perm: perm.CREATE,
    handler: dictItemService.create.bind(dictItemService),
  },
  PUT: {
    isPublic: false,
    perm: "",
    // perm: perm.UPDATE,
    handler: dictItemService.update.bind(dictItemService),
  },
  DELETE: {
    isPublic: false,
    perm: "",
    // perm: perm.DELETE,
    handler: dictItemService.deleteByIds.bind(dictItemService),
  },
};

export const { loader, action } = remixApi.createApi(options);
