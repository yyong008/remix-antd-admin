import {
  newsCategoryCreateService,
  newsCategoryDeleteService,
  newsCategoryUpdateService,
  readNewsCategoryListService,
} from "@/services/admin/news/news-category.service";

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
  GET: await createApi(options.GET, readNewsCategoryListService),
  POST: await createApi(options.CREATE, newsCategoryCreateService),
  PUT: await createApi(options.UPDATE, newsCategoryUpdateService),
  DELETE: await createApi(options.DELETE, newsCategoryDeleteService),
};

export const { loader, action } = api(restfulApis);
