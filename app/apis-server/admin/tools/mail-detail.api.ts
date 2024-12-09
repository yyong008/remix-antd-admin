import type { Op } from "@/types/restful";
import { remixApi } from "~/utils/server/remixApi";

// import { blogCategoryPermissions as perm } from "@/constants/permission";

const options: Op = {
  GET: {
    isPublic: false,
    perm: "",
    // perm: perm.READ_LIST,
    handler: () => {}, // TODO: 找到
  },
};

export const { loader } = remixApi.createApi(options);
