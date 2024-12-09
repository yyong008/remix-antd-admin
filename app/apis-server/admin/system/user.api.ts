import type { Op } from "@/types/restful";
import { remixApi } from "@/utils/server/remixApi";
import { userService } from "~/services/admin/system/UserService";

// import { blogCategoryPermissions as perm } from "@/constants/permission";

const options: Op = {
  GET: {
    isPublic: false,
    perm: "",
    // perm: perm.READ_LIST,
    handler: userService.getList.bind(userService),
  },
  POST: {
    isPublic: false,
    // perm: perm.CREATE,
    handler: userService.create.bind(userService),
  },
  PUT: {
    isPublic: false,
    // perm: perm.UPDATE,
    handler: userService.update.bind(userService),
  },
  DELETE: {
    isPublic: false,
    // perm: perm.DELETE,
    handler: userService.deleteByIds.bind(userService),
  },
};

export const { loader, action } = remixApi.createApi(options);
