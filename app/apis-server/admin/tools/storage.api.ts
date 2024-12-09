import type { Op } from "@/types/restful";
import { remixApi } from "~/utils/server/remixApi";
import { storageService } from "~/services/admin/tools/StorageService";

// import { blogCategoryPermissions as perm } from "@/constants/permission";

const options: Op = {
  GET: {
    isPublic: false,
    perm: "",
    // perm: perm.READ_LIST,
    handler: storageService.getList,
  },
  POST: {
    isPublic: false,
    // perm: perm.CREATE,
    handler: storageService.create,
  },
  // PUT: {
  //   isPublic: false,
  //   // perm: perm.UPDATE,
  //   handler: storageService.updateToolsStorageService
  // },
  DELETE: {
    isPublic: false,
    // perm: perm.DELETE,
    handler: storageService.deleteById,
  },
};

export const { loader, action } = remixApi.createApi(options);
