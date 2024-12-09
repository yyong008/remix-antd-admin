import type { Op } from "@/types/restful";
import { remixApi } from "~/utils/server/remixApi";
import { signInService } from "@/services/admin/signin";

const options: Op = {
  POST: {
    isPublic: true,
    perm: "",
    handler: signInService.create.bind(signInService),
  },
};

export const { action } = remixApi.createApi(options);
