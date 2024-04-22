// type
import type { ActionFunctionArgs } from "@remix-run/node";

// remix
import {
  json,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import prisma from "~/server/services/common/prisma";
import { getUserId$ } from "~/server/services/common/session";

import * as clientUtils from "~/utils";
import { lastValueFrom } from "rxjs";

export const action = async ({ request }: ActionFunctionArgs) => {
  // 授权

  const userId = await lastValueFrom(getUserId$(request));

  if (!userId) {
    return json({
      code: 1,
      message: "未授权",
      data: {},
    });
  }
  const method = request.method;
  if (method === "POST") {
    const uploadHandler = unstable_composeUploadHandlers(
      unstable_createFileUploadHandler({
        maxPartSize: 2 * 1024 * 1024,
        directory: "public/uploads", // 指定上传目录
        file: ({ filename }) => filename,
      }),
      // parse everything else into memory
      unstable_createMemoryUploadHandler(),
    );
    const formData = await unstable_parseMultipartFormData(
      request,
      uploadHandler,
    );

    const file: any = formData.get("file");

    const _file = await prisma.storage.create({
      data: {
        userId,
        name: file.name,
        fileName: file.name,
        extName: clientUtils.extname(file.name),
        path: "/uploads/" + file.name,
        size: file.size.toString(),
        type: file.type,
      },
    });
    return json({
      code: 0,
      message: "ok",
      data: _file,
    });
  }
};
