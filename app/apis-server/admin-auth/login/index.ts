import type { Op } from "@/types/restful";
import { loginSchema } from "@/schema/auth/login";
import { loginService } from "@/services/admin-auth/login";
import { remixApi } from "@/utils/server/remixApi";

const options: Op = {
  POST: {
    isPublic: true,
    schemas: {
      body: loginSchema.CREATE,
    },
    perm: "",
    isPresentationMode: false,
    handler: loginService.loginAction.bind(loginService),
  },
};

export const { action } = remixApi.createApi(options);
