import type { Op } from "@/types/restful";
import { refreshTokenTool } from "@/services/admin-auth/refresh";
import { remixApi } from "@/utils/server/remixApi";

const options: Op = {
  POST: {
    isPublic: true,
    perm: "",
    handler: refreshTokenTool.createTokens.bind(refreshTokenTool),
  },
};

export const { action } = remixApi.createApi(options);
