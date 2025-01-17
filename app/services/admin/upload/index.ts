import * as clientUtils from "~/utils/client";
import type * as rrn from "react-router";

import { cwd } from "node:process";
import fs from "node:fs";
import path from "node:path";
// import { joseJwt } from "@/libs/jose";
import { storageService } from "@/services/admin/tools/StorageService";

// const uploadDir = path.join(__dirname, 'public', 'uploads');
const uploadDir = path.join(cwd(), "public", "uploads");

class UploadService {
  uploadMaxSize = 2 * 1024 * 1024; // 2MB
  directory = "public/uploads";
  storageDirectory = "/uploads/";

  async uploadAvatar(args: rrn.LoaderFunctionArgs) {
    // 解析表单数据
    const formData = await args.request.formData();
    const file = formData.get("file");

    // 检查文件是否存在并确保它是一个有效的文件对象
    if (!file || !(file instanceof globalThis.File)) {
      throw Error("文件未提供或无效");
    }

    // 获取文件的原始名称
    const originalFileName = file.name;
    const fileExtension = path.extname(originalFileName); // 获取文件扩展名
    const fileBaseName = path.basename(originalFileName, fileExtension); // 获取文件名（不含扩展名）

    // 创建文件保存的路径
    let uniqueFileName = originalFileName;
    const filePath = path.join(uploadDir, uniqueFileName);

    // 如果文件已经存在，生成唯一的文件名（加上时间戳）
    if (fs.existsSync(filePath)) {
      const timestamp = Date.now();
      uniqueFileName = `${fileBaseName}-${timestamp}${fileExtension}`;
    }

    // 创建最终的文件保存路径
    const uniqueFilePath = path.join(uploadDir, uniqueFileName);

    // 确保上传目录存在
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // 将文件内容写入目标路径
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(uniqueFilePath, buffer);
    const result = storageService.createByData({
      userId: 1,
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
