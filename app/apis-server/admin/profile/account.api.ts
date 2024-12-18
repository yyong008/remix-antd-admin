import type { Op } from "@/types/restful";
import { permissions } from "@/constants/permission";
import { profileAccountService } from "~/services/admin/profile/AccountService";
import { remixApi } from "~/utils/server/remixApi";

const options: Op = {
  GET: {
    isPublic: false,
    perm: permissions.admin.profile.account.READ,
    handler: profileAccountService.getByUserId,
  },
};

export const { loader } = remixApi.createApi(options);
