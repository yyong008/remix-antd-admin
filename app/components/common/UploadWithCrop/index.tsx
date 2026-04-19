import { Upload, message } from "antd";
import { useEffect, useRef, useState } from "react";

import { Cropper } from "../Copper"; // 确保路径正确
import { ProFormUploadButton } from "@ant-design/pro-components";

const UploadWithCrop = () => {
  const [copperVisible, setCopperVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  let resolveFn = useRef<any>(null);

  const beforeUpload = async (file: any) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("只能上传图片文件!");
      return Upload.LIST_IGNORE;
    }
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImageSrc(reader.result as any);
      setCopperVisible(true);
    });
    reader.readAsDataURL(file);
    const blob: any = await new Promise((resolve) => {
      resolveFn.current = resolve;
    });
    const { type, uid, name } = file;
    const newFile = new File([blob], name, { type });
    Object.assign(newFile, { uid });
    return newFile;
  };

  // 处理裁剪完成后的上传逻辑
  const handleCropOk = async (canvas: any) => {
    setCopperVisible(false);
    if (!canvas) {
      message.error("裁剪失败，请重新尝试。");
      return;
    }
    // setCroppedFile(croppedFile);
    canvas.toBlob(async (blob: any) => {
      resolveFn.current?.(blob);
    });
  };

  // 处理裁剪取消逻辑
  const handleCropCancel = () => {
    setCopperVisible(false);
    setImageSrc(null);
    resolveFn.current = null;
  };

  useEffect(() => {
    return () => {
      resolveFn.current = null;
    };
  }, []);

  return (
    <>
      <ProFormUploadButton
        name="file"
        label="上传头像"
        placeholder="请输入名称"
        listType="picture-card"
        action="/api/upload"
        max={1}
        fieldProps={{
          headers: {
            authorization: "bearer " + localStorage.getItem("token"),
          },
          onChange: (info) => {
            if (info.file.status === "done") {
              if (info.file.response.code === 0) {
                message.success(info.file.response.message ?? "上传成功");
              } else {
                message.error(info.file.response.message ?? "上传失败");
              }
            }
          },
          beforeUpload,
        }}
      />
      {imageSrc && (
        <Cropper
          open={copperVisible}
          imageSrc={imageSrc}
          aspect={1}
          circular={true}
          initialWidth={200}
          initialHeight={200}
          onOk={handleCropOk}
          onCancel={handleCropCancel}
        />
      )}
    </>
  );
};

export default UploadWithCrop;
