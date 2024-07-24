import { api, createApi } from "@/utils/server/api/index";

import { readService } from "@/services/admin/blog/blog.service";

// import { blogPermissions as perm } from "@/constants/permission";

const options = {
  GET: {
    isPublic: false,
    perm: "",
    // perm: perm.READ_LIST,
  },
};

const restfulApis = {
  GET: await createApi(options.GET, readService),
};

export const { loader } = api(restfulApis);
