import * as clientUtils from "~/utils/client";
import type * as rrn from "@remix-run/node";

import {
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createFileUploadHandler as createFileUploadHandler,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as uparseMultipartFormData,
} from "@remix-run/node";

import { joseJwt } from "@/libs/jose";
import { storageService } from "@/services/admin/tools/StorageService";

class UploadService {
  uploadMaxSize = 2 * 1024 * 1024; // 2MB
  directory = "public/uploads";
  storageDirectory = "/uploads/";
  async uploadAvatar(args: rrn.LoaderFunctionArgs) {
    const { uploadMaxSize, directory } = this;
    const { request } = args;
    const payload = await joseJwt.getTokenUserIdByArgs(args);
    const userId = payload.userId;
    if (!userId) {
      throw new Error("Not found user");
    }
    const fileUploader = createFileUploadHandler({
      maxPartSize: uploadMaxSize,
      directory,
      file: ({ filename }) => filename,
    });
    const memoryUploader = createMemoryUploadHandler();

    const uploadHandler = await composeUploadHandlers(
      fileUploader,
      memoryUploader,
    );
    const formData = await uparseMultipartFormData(request, uploadHandler);
    const file: any = formData.get("file");
    const result = storageService.createByData({
      userId,
      name: file.name,
      fileName: file.name,
      extName: clientUtils.extname(file.name),
      path: this.storageDirectory + file.name,
      size: file.size.toString(),
      type: file.type,
    });
    return result;
  }
}

export const uploadService = new UploadService();
