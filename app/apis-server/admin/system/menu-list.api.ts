import type { Op } from "@/types/restful";
import { menuService } from "@/services/admin/system/MenuService";
import { permissions } from "@/constants/permission";
import { remixApi } from "@/utils/server/remixApi";
import { schemas } from "~/schemas";

const options: Op = {
  GET: {
    isPublic: false,
    perm: permissions.admin.system.menu.READ_LIST,
    schemas: {
      url: schemas.admin.system.menu.READ_LIST,
    },
    handler: menuService.getMenuList,
  },
};

export const { loader } = remixApi.createApi(options);
