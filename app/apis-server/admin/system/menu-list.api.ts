import { api } from "@/utils/server/api";
import { createApi } from "@/utils/server/api/api-handler";
import { readSystemMenuListService } from "@/services/admin/system/menu";

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
  GET: await createApi(options.GET, readSystemMenuListService),
};

export const { loader } = api(restfulApis);
