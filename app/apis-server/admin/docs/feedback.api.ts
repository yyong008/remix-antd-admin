import {
  createFeedbackService,
  deleteFeedbackService,
  readFeedbackListService,
  updateFeedbackService,
} from "@/services/admin/docs/feedback.service";

import { api } from "@/utils/server/api";
import { createApi } from "@/utils/server/api/api-handler";

// import { blogCategoryPermissions as perm } from "@/constants/permission";

const options = {
  GET: {
    isPublic: false,
    perm: "",
    // perm: perm.READ_LIST,
  },
  CREATE: {
    isPublic: false,
    // perm: perm.CREATE,
  },
  UPDATE: {
    isPublic: false,
    // perm: perm.UPDATE,
  },
  DELETE: {
    isPublic: false,
    // perm: perm.DELETE,
  },
};

const restfulApis = {
  GET: await createApi(options.GET, readFeedbackListService),
  POST: await createApi(options.CREATE, createFeedbackService),
  PUT: await createApi(options.UPDATE, updateFeedbackService),
  DELETE: await createApi(options.DELETE, deleteFeedbackService),
};

export const { loader, action } = api(restfulApis);
