import {
  createMailTemplateService,
  deleteMailTemplateService,
  readMailTemplateListService,
  updateMailTemplateService,
} from "@/services/admin/tools/mail.api";

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
  GET: await createApi(options.GET, readMailTemplateListService),
  POST: await createApi(options.CREATE, createMailTemplateService),
  PUT: await createApi(options.UPDATE, updateMailTemplateService),
  DELETE: await createApi(options.DELETE, deleteMailTemplateService),
};

export const { loader, action } = api(restfulApis);
