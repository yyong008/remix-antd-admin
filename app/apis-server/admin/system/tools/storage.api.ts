import { linkCategoryService } from "@/services/admin/profile/LinkCategoryService";
import { permissions } from "@/constants/permission";
import { remixApi } from "@/utils/server/remixApi";

const options = {
  GET: {
    isPublic: false,
    perm: permissions.admin.tools.storage.READ_LIST,
    handler: linkCategoryService.getList.bind(linkCategoryService),
  },
  POST: {
    isPublic: false,
    perm: permissions.admin.tools.storage.CREATE,
    handler: linkCategoryService.create.bind(linkCategoryService),
  },
  PUT: {
    isPublic: false,
    perm: permissions.admin.tools.storage.UPDATE,
    handler: linkCategoryService.update.bind(linkCategoryService),
  },
  DELETE: {
    isPublic: false,
    perm: permissions.admin.tools.storage.DELETE,
    handler: linkCategoryService.deleteByIds.bind(linkCategoryService),
  },
};

export const { loader, action } = remixApi.createApi(options);
