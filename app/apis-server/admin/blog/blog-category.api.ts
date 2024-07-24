import {
  actionBlogCategoryCreate,
  actionBlogCategoryDelete,
  actionBlogCategoryUpdate,
  query,
} from "@/services/admin/blog/blog-category.service";

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
  GET: await createApi(options.GET, query),
  POST: await createApi(options.CREATE, actionBlogCategoryCreate),
  PUT: await createApi(options.UPDATE, actionBlogCategoryUpdate),
  DELETE: await createApi(options.DELETE, actionBlogCategoryDelete),
};

export const { loader, action } = api(restfulApis);
