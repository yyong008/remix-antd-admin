import type { Op } from "@/types/restful";
import { feedBackService } from "@/services/admin/docs/FeedbackService";
import { permissions } from "@/constants/permission";
import { remixApi } from "@/utils/server/remixApi";
import { schemas } from "@/schemas";

const options: Op = {
  GET: {
    isPublic: false,
    perm: permissions.admin.docs.feedback.READ_LIST,
    schemas: {
      url: schemas.admin.docs.feedback.READ_LIST,
    },
    handler: feedBackService.getList,
  },
  POST: {
    isPublic: false,
    perm: permissions.admin.docs.feedback.CREATE,
    schemas: {
      body: schemas.admin.docs.feedback.CREATE,
    },
    handler: feedBackService.create,
  },
  PUT: {
    isPublic: false,
    perm: permissions.admin.docs.feedback.UPDATE,
    schemas: {
      body: schemas.admin.docs.feedback.UPDATE,
    },
    handler: feedBackService.update,
  },
  DELETE: {
    isPublic: false,
    perm: permissions.admin.docs.feedback.DELETE,
    schemas: {
      body: schemas.admin.docs.feedback.DELETE,
    },
    handler: feedBackService.deleteByIds,
  },
};

export const { loader, action } = remixApi.createApi(options);
