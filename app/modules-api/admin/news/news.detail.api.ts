import { api, createApi } from "@/utils/server/api/index";

import { readNewsService } from "@/services/admin/news/news.service";

// import { blogPermissions as perm } from "@/constants/permission";

const options = {
  GET: {
    isPublic: false,
    perm: "",
    // perm: perm.READ_LIST,
  },
};

const restfulApis = {
  GET: await createApi(options.GET, readNewsService),
};

export const { loader } = api(restfulApis);
