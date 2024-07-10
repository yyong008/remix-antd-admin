import {
  createLinkService,
  deleteLinkService,
  readLinkListService,
  updateLinkService,
} from "~/services/admin/profile/link.api";

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
  GET: await createApi(options.GET, readLinkListService),
  POST: await createApi(options.CREATE, createLinkService),
  PUT: await createApi(options.UPDATE, updateLinkService),
  DELETE: await createApi(options.DELETE, deleteLinkService),
};

export const { loader, action } = api(restfulApis);
