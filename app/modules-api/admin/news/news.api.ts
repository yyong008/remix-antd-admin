import { api, createApi } from "@/utils/server/api/index";
import {
  createNewsService,
  deleteNewsService,
  readNewsListService,
  updateNewsService,
} from "@/services/admin/news/news.service";

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
  GET: await createApi(options.GET, readNewsListService),
  POST: await createApi(options.CREATE, createNewsService),
  PUT: await createApi(options.UPDATE, updateNewsService),
  DELETE: await createApi(options.DELETE, deleteNewsService),
};

export const { loader, action } = api(restfulApis);
