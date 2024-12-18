import type { Op } from "@/types/restful";
import { mailTemplateService } from "@/services/admin/tools/MailService";
import { permissions } from "@/constants/permission";
import { remixApi } from "@/utils/server/remixApi";

const options: Op = {
  GET: {
    isPublic: false,
    perm: permissions.admin.tools.mail.READ_LIST,
    handler: mailTemplateService.getList,
  },
  POST: {
    isPublic: false,
    perm: permissions.admin.tools.mail.CREATE,
    handler: mailTemplateService.create,
  },
  PUT: {
    isPublic: false,
    perm: permissions.admin.tools.mail.UPDATE,
    handler: mailTemplateService.update,
  },
  DELETE: {
    isPublic: false,
    perm: permissions.admin.tools.mail.DELETE,
    handler: mailTemplateService.deleteByIds,
  },
};

export const { loader, action } = remixApi.createApi(options);
