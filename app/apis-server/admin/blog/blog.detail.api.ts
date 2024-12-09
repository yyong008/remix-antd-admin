import type { Op } from "@/types/restful";
import { blogService } from "~/services/admin/blog/BlogService";
import { remixApi } from "~/utils/server/remixApi";

// import { blogPermissions as perm } from "@/constants/permission";

const options: Op = {
  GET: {
    isPublic: false,
    perm: "",
    // perm: perm.READ_LIST,
    handler: blogService.getById,
  },
};

export const { loader } = remixApi.createApi(options);
