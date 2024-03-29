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
  const method = request.method;
  if (method === "POST") {
    const uploadHandler = unstable_composeUploadHandlers(
      unstable_createFileUploadHandler({
        maxPartSize: 5_000_000,
        directory: "public/uploads/avatar", // 指定上传目录
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

    return json({
      code: 0,
      message: "ok",
      data: file,
    });
  }
};
