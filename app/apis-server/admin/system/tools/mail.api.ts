import type { Op } from "@/types/restful";
import { mailTemplateService } from "~/services/admin/tools/MailService";
import { remixApi } from "~/utils/server/remixApi";

// import { blogCategoryPermissions as perm } from "@/constants/permission";

const options: Op = {
  GET: {
    isPublic: false,
    perm: "",
    // perm: perm.READ_LIST,
    handler: mailTemplateService.getList,
  },
  POST: {
    isPublic: false,
    // perm: perm.CREATE,
    handler: mailTemplateService.create,
  },
  PUT: {
    isPublic: false,
    // perm: perm.UPDATE,
    handler: mailTemplateService.update,
  },
  DELETE: {
    isPublic: false,
    // perm: perm.DELETE,
    handler: mailTemplateService.deleteByIds,
  },
};

export const { loader, action } = remixApi.createApi(options);
