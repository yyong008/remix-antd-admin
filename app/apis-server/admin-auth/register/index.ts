import { registerService } from "@/services/admin-auth/register";
import { remixApi } from "@/utils/server/remixApi";

const options = {
  POST: {
    isPublic: true,
    // schema: LoginSchema,
    perm: "",
    handler: registerService.register.bind(registerService),
  },
};

export const { action } = remixApi.createApi(options);
