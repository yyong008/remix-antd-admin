import type { Op } from "@/types/restful";
import { menuRoleService } from "@/services/admin/system/MenuRoleService";
import { remixApi } from "@/utils/server/remixApi";
// import { blogCategoryPermissions as perm } from "@/constants/permission";

const options: Op = {
  GET: {
    isPublic: false,
    perm: "",
    // perm: perm.READ_LIST,
    handler: menuRoleService.getAll,
  },
};

export const { loader } = remixApi.createApi(options);
