import { remixApi } from "@/utils/server/remixApi";
import { uploadService } from "@/services/admin/upload/index";
import { schemas } from "@/schemas";

const options = {
  POST: {
    isPublic: true,
    schemas: {
      body: schemas.admin.upload.CREATE,
    },
    handler: uploadService.uploadAvatar.bind(uploadService),
  },
};

export const { action } = remixApi.createApi(options);
