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

export const action = async ({ request }: ActionFunctionArgs) => {
  // 授权

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

    const file = formData.get("file");
    // 写入数据库
    return json({
      code: 0,
      message: "ok",
      data: file,
    });
  }
};
