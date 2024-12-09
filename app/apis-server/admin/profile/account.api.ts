import type { Op } from "@/types/restful";
import { profileAccountService } from "~/services/admin/profile/AccountService";
import { remixApi } from "~/utils/server/remixApi";
// import { blogCategoryPermissions as perm } from "@/constants/permission";

const options: Op = {
  GET: {
    isPublic: false,
    perm: "",
    // perm: perm.READ_LIST,
    handler: profileAccountService.getByUserId,
  },
};

export const { loader } = remixApi.createApi(options);
