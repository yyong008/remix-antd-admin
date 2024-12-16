import type { Op } from "@/types/restful";
import { dictService } from "~/services/admin/system/DictService";
import { remixApi } from "~/utils/server/remixApi";
// import { blogCategoryPermissions as perm } from "@/constants/permission";

const options: Op = {
  GET: {
    isPublic: false,
    perm: "",
    // perm: perm.READ_LIST,
    handler: dictService.getList.bind(dictService),
  },
  POST: {
    isPublic: false,
    perm: "",
    // perm: perm.CREATE,
    handler: dictService.create.bind(dictService),
  },
  PUT: {
    isPublic: false,
    perm: "",
    // perm: perm.UPDATE,
    handler: dictService.update.bind(dictService),
  },
  DELETE: {
    isPublic: false,
    perm: "",
    handler: dictService.deleteByIds.bind(dictService),
  },
};

export const { loader, action } = remixApi.createApi(options);
