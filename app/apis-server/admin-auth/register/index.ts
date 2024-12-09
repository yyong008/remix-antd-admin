import { remixApi } from "@/utils/server/remixApi";
import { registerService } from "@/services/admin-auth/register";

const options = {
  GET: {
    isPublic: true,
    // schema: LoginSchema,
    perm: "",
    handler: registerService.register.bind(registerService),
  },
};

export const { action } = remixApi.createApi(options);
