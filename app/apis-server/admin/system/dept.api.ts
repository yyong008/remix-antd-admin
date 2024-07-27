import {
  createSystemDeptService,
  readSystemDeptListService,
  updateSystemDeptService,
} from "@/services/admin/system/dept";

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
  GET: await createApi(options.GET, readSystemDeptListService),
  POST: await createApi(options.CREATE, createSystemDeptService),
  PUT: await createApi(options.UPDATE, updateSystemDeptService),
  // DELETE: await createApi(options.DELETE, deleteSystemDeptService),
};

export const { loader, action } = api(restfulApis);
