import { registerService } from "@/services/admin-auth/register";
import { remixApi } from "@/utils/server/remixApi";
import { schemas } from "~/schemas";

const options = {
  POST: {
    isPublic: true,
    schema: {
      body: schemas.adminAuth.register.CREATE,
    },
    perm: "",
    handler: registerService.register.bind(registerService),
  },
};

export const { action } = remixApi.createApi(options);
