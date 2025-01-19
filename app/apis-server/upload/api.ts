import { remixApi } from "@/utils/server/remixApi";
import { schemas } from "~/schemas";
import { uploadService } from "@/services/admin/upload/index";

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
