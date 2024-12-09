import type { Op } from "@/types/restful";
import { menuService } from "~/services/admin/system/MenuService";
import { remixApi } from "~/utils/server/remixApi";
// import { blogCategoryPermissions as perm } from "@/constants/permission";

const options: Op = {
  GET: {
    isPublic: false,
    perm: "",
    // perm: perm.READ_LIST,
    handler: menuService.getMenuTree,
  },
};

export const { loader } = remixApi.createApi(options);
