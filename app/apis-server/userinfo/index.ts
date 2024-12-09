import type { Op } from "@/types/restful";
import { remixApi } from "~/utils/server/remixApi";
import { userInfoService } from "@/services/admin/userInfo";

const options: Op = {
  GET: {
    isPublic: true,
    perm: "",
    handler: userInfoService.getUserInfo.bind(userInfoService),
  },
};

export const { loader } = remixApi.createApi(options);
