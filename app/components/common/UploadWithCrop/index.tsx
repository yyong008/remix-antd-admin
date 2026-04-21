import { Upload, message } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";

import { Cropper } from "../Copper";
import { ProFormUploadButton } from "~/components/pro-form-kit";

type UploadWithCropProps = {
  name?: string;
  label?: string;
  placeholder?: string;
};

const UploadWithCrop = ({
  name = "file",
  label = "上传头像",
  placeholder = "选择图片",
}: UploadWithCropProps) => {
  const [cropperVisible, setCropperVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [cropperKey, setCropperKey] = useState(0);
  const resolveRef = useRef<((blob: Blob | null) => void) | null>(null);

  const finishWithBlob = useCallback((blob: Blob | null) => {
    const r = resolveRef.current;
    resolveRef.current = null;
    r?.(blob);
  }, []);

  useEffect(() => {
    return () => {
      if (resolveRef.current) {
        resolveRef.current(null);
        resolveRef.current = null;
      }
    };
  }, []);

  const beforeUpload = async (file: File & { uid?: string }) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("只能上传图片文件");
      return Upload.LIST_IGNORE;
    }

    setCropperKey((k) => k + 1);

    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });

    setImageSrc(dataUrl);
    setCropperVisible(true);

    const blob = await new Promise<Blob | null>((resolve) => {
      resolveRef.current = resolve;
    });

    if (!blob) {
      return Upload.LIST_IGNORE;
    }

    const newFile = new File([blob], file.name, {
      type: blob.type || file.type || "image/png",
    });
    Object.assign(newFile, { uid: file.uid });
    return newFile;
  };

  const handleCropOk = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) {
      message.error("裁剪失败，请重试");
      setCropperVisible(false);
      setImageSrc(null);
      finishWithBlob(null);
      return;
    }
    canvas.toBlob(
      (blob) => {
        setCropperVisible(false);
        setImageSrc(null);
        finishWithBlob(blob);
      },
      "image/png",
      0.92,
    );
  };

  const handleCropCancel = () => {
    setCropperVisible(false);
    setImageSrc(null);
    finishWithBlob(null);
  };

  return (
    <>
      <ProFormUploadButton
        name={name}
        label={label}
        placeholder={placeholder}
        listType="picture-card"
        action="/api/upload"
        max={1}
        fieldProps={{
          headers: {
            authorization: "bearer " + localStorage.getItem("token"),
          },
          onChange: (info) => {
            if (info.file.status === "done") {
              if (info.file.response?.code === 0) {
                message.success(info.file.response.message ?? "上传成功");
              } else {
                message.error(info.file.response?.message ?? "上传失败");
              }
            }
          },
          beforeUpload,
        }}
      />
      {imageSrc ? (
        <Cropper
          key={cropperKey}
          open={cropperVisible}
          imageSrc={imageSrc}
          aspect={1}
          circular
          initialWidth={200}
          initialHeight={200}
          onOk={handleCropOk}
          onCancel={handleCropCancel}
        />
      ) : null}
    </>
  );
};

export default UploadWithCrop;
