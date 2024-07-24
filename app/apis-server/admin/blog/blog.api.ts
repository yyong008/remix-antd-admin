import { api, createApi } from "@/utils/server/api/index";
import {
  createBlogService,
  deleteBlogService,
  readListService,
  updateBlogService,
} from "@/services/admin/blog/blog.service";

// import { blogPermissions as perm } from "@/constants/permission";

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
  GET: await createApi(options.GET, readListService),
  POST: await createApi(options.CREATE, createBlogService),
  PUT: await createApi(options.UPDATE, updateBlogService),
  DELETE: await createApi(options.DELETE, deleteBlogService),
};

export const { loader, action } = api(restfulApis);
