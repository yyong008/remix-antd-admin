import { remixApi } from "@/utils/server/remixApi";
import { uploadService } from "@/services/admin/upload/index";

const options = {
  POST: {
    isPublic: true,
    // perm: perm.CREATE,
    handler: uploadService.uploadAvatar.bind(uploadService),
  },
};

export const { action } = remixApi.createApi(options);
