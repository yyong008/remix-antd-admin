// import { blogTagPermissions as perm } from "~/constants/permission";

import {
  actionBlogTagCreate,
  actionBlogTagDelete,
  actionBlogTagUpdate,
  query,
} from "@/services/admin/blog/blog-tag.service";

import { api } from "~/utils/server/api";
import { createApi } from "~/utils/server/api/api-handler";

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
  POST: await createApi(options.CREATE, actionBlogTagCreate),
  PUT: await createApi(options.UPDATE, actionBlogTagUpdate),
  DELETE: await createApi(options.DELETE, actionBlogTagDelete),
};

export const { loader, action } = api(restfulApis);
