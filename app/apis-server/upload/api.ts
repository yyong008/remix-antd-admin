import { api, createApi } from "@/utils/server/api/index";

import { createToolsStorage$ } from "./action";

// import { blogPermissions as perm } from "@/constants/permission";

const options = {
  CREATE: {
    isPublic: true,
    // perm: perm.CREATE,
  },
};

const createToolsStorageService = (args: any) => {
  return createToolsStorage$(args);
};

const restfulApis = {
  POST: await createApi(options.CREATE, createToolsStorageService),
};

export const { action } = api(restfulApis);
