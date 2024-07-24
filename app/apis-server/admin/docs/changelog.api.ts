import {
  createChangelogService,
  deleteChangelogService,
  readChangelogListService,
  updateChangelogService,
} from "@/services/admin/docs/changelog.service";

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
  GET: await createApi(options.GET, readChangelogListService),
  POST: await createApi(options.CREATE, createChangelogService),
  PUT: await createApi(options.UPDATE, updateChangelogService),
  DELETE: await createApi(options.DELETE, deleteChangelogService),
};

export const { loader, action } = api(restfulApis);
