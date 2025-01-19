import type { Op } from "@/types/restful";
import { loginService } from "@/services/admin-auth/login";
import { remixApi } from "@/utils/server/remixApi";
import { schemas } from "~/schemas";

const options: Op = {
  POST: {
    isPublic: true,
    schemas: {
      body: schemas.adminAuth.login.CREATE,
    },
    perm: "",
    isPresentationMode: false,
    handler: loginService.loginAction.bind(loginService),
  },
};

export const { action } = remixApi.createApi(options);
