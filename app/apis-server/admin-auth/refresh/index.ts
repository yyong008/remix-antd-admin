import type { Op } from "@/types/restful";
import { refreshTokenTool } from "@/services/admin-auth/refresh";
import { remixApi } from "@/utils/server/remixApi";

const options: Op = {
  POST: {
    isPublic: true,
    perm: "",
    handler: refreshTokenTool.createToken.bind(refreshTokenTool),
  },
};

export const { loader } = remixApi.createApi(options);
