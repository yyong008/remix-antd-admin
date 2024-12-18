import type { Op } from "@/types/restful";
import { menuRoleService } from "@/services/admin/system/MenuRoleService";
import { permissions } from "@/constants/permission";
import { remixApi } from "@/utils/server/remixApi";
import { schemas } from "@/schemas";

const options: Op = {
  GET: {
    isPublic: false,
    schemas: {
      url: schemas.admin.system.menu.READ_LIST,
    },
    perm: permissions.admin.system.menuRole.READ_LIST,
    handler: menuRoleService.getAll,
  },
};

export const { loader } = remixApi.createApi(options);
