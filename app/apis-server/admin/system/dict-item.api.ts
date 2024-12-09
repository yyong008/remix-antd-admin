import type { Op } from "@/types/restful";
import { dictService } from "~/services/admin/system/DictService";
import { remixApi } from "~/utils/server/remixApi";

// import { blogCategoryPermissions as perm } from "@/constants/permission";

const options: Op = {
  GET: {
    isPublic: false,
    perm: "",
    // perm: perm.READ_LIST,
    handler: dictService.getList.bind(dictService),
  },
};

export const { loader } = remixApi.createApi(options);
