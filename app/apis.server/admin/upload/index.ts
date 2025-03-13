import { Context, Hono } from "hono";
import { existsSync, mkdirSync, createWriteStream } from "node:fs";
import { fileTypeFromBuffer } from "file-type";
import path from "path";
import { uploadConfig } from "~/config/uploadConfig";
export const uploadRouter = new Hono();


uploadRouter.post("/feedback", async (c: Context) => {
  try {

    const { file: _file } = await c.req.parseBody();
    if(_file instanceof File) {
      const arrayBuffer = await _file.arrayBuffer();
      const bf = Buffer.from(arrayBuffer);
      const fileType = await fileTypeFromBuffer(bf);
      if (!uploadConfig.fileExts.includes(fileType!.ext)) {
        return c.json({
          code: 1,
          message: "file type is not allowed",
        });
      }
      if(!existsSync(uploadConfig.uploadDir)) {
        mkdirSync(uploadConfig.uploadDir, { recursive: true });
      }
      const outputFileName = path.join(
        uploadConfig.uploadDir,
        `${_file.name}`,
      );

      const stream = createWriteStream(outputFileName);
      stream.write(bf);

      const url = `${uploadConfig.prefix}/${_file.name}`;
      return c.json({
        code: 0,
        message: "success",
        data: {
          url,
        },
      });
    }
  } catch (error) {
    return c.json({
      code: 1,
      message: error instanceof Error ? error.message : "unknown error",
      data: error,
    });
  }
});


uploadRouter.post("/avatar", async (c: Context) => {
  try {

    const { file: _file } = await c.req.parseBody();
    if(_file instanceof File) {
      const arrayBuffer = await _file.arrayBuffer();
      const bf = Buffer.from(arrayBuffer);
      const fileType = await fileTypeFromBuffer(bf);
      if (!uploadConfig.fileExts.includes(fileType!.ext)) {
        return c.json({
          code: 1,
          message: "file type is not allowed",
        });
      }
      if(!existsSync(uploadConfig.uploadDir)) {
        mkdirSync(uploadConfig.uploadDir, { recursive: true });
      }
      const outputFileName = path.join(
        uploadConfig.uploadDir,
        `${_file.name}`,
      );

      const stream = createWriteStream(outputFileName);
      stream.write(bf);

      const url = `${uploadConfig.prefix}/${_file.name}`;
      return c.json({
        code: 0,
        message: "success",
        data: {
          url,
        },
      });
    }
  } catch (error) {
    return c.json({
      code: 1,
      message: error instanceof Error ? error.message : "unknown error",
      data: error,
    });
  }
});
