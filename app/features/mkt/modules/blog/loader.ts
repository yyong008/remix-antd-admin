import type { Op } from "@/types/restful";
import { blogService } from "@/services/client/BlogService";
import { remixApi } from "@/utils/server/remixApi";

// import { blogCategoryPermissions as perm } from "@/constants/permission";

const options: Op = {
  GET: {
    isPublic: true,
    perm: "",
    handler: blogService.getList,
  },
};

export const { loader } = remixApi.createApi(options);
