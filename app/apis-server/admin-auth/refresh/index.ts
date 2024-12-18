import type { Op } from "@/types/restful";
import { schemas } from "@/schemas";
import { refreshTokenTool } from "@/services/admin-auth/refresh";
import { remixApi } from "@/utils/server/remixApi";

const options: Op = {
  POST: {
    isPublic: true,
    perm: "",
    schemas: {
      body: schemas.adminAuth.refresh_token.CREATE,
    },
    handler: refreshTokenTool.createTokens.bind(refreshTokenTool),
  },
};

export const { action } = remixApi.createApi(options);
